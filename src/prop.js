define(['src/act'], function (act) {
    
    /*** @module.start ***/
    
    (function (pkg) {
    
        /**
         * Property function
         */
        pkg.$prop = function (obj, key, val) {
            return new pkg.Property(obj, key, val);
        };
    
        /**
         * Scan an object to set up properties
         */
        pkg.$scan = function (obj) {
            if (typeof obj.$prop !== 'object') {
                obj.$prop = {};
            }
            for (var key in obj) {
                if (!obj.hasOwnProperty(key) || key[0] === '$') {
                    continue;
                }
                
                if (!obj.$prop[key]) {
                    obj.$prop[key] = new pkg.Property(obj, key);
                }
            }
        };
        
        /**
         * Property Class
         */
        pkg.Property = function (obj, key, val) {
            if (typeof obj.$prop !== 'object') {
                obj.$prop = {};
            }
            obj.$prop[key] = this;
            this.$object = obj;
            this.$key = key;
            this.$then = [];
            this.$onupdate = [];
            this.set(val || obj[key]);
        };
        
        var proto = pkg.Property.prototype;
            
        /**
         * Set Property
         */
        proto.set = function (val) {
            var self = this;
                
            /**
             * Async Properties
             */
            if (val instanceof pkg.Async) {
                var fn = function () {
                    self.set(val.$value);
                };
                fn();
                val.$onupdate.push(fn);
                return;
            }
            
            /**
             * Calculated Properties
             */
            if (val instanceof pkg.Calculation) {
                this.$run = function () {
                    try {
                        self.set(val.$run());
                    }
                    catch (e) {
                        self.set(undefined);
                        console && console.error && console.error(e.message || e);
                    }
                };
                return this.$run();
            }
                
            /**
             * Normal Properties
             */
            if (this.$object[this.$key] !== val) {
                this.$object[this.$key] = val;
                    
                this.$then.forEach(function (then) {
                    if (typeof(then) === 'function') {
                        then(val);
                    }
                });
                
                this.$onupdate.forEach(function (fn) {
                    typeof fn === 'function' && fn();
                });
                
                if (this.$object.$run) {
                    this.$object.$run();
                }
            }
        };
        
        /**
         * Add to then chain
         */
        proto.then = function (then) {
            this.$then.push(then);
            return this;
        };
        
    })(act);
    
    /*** @module.end ***/

});
