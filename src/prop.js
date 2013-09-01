require(['act'], function (act) {
    
    /**
     * Property function
     */
    act.$prop = function (obj, key, val) {
        return new act.Property(obj, key, val);
    };
    
    /**
     * Property Class
     */
    act.Property = function (obj, key, val) {
        if (typeof obj.$prop === 'undefined') {
            obj.$prop = {};
        }
        obj.$prop[key] = this;
        this.$object = obj;
        this.$key = key;
        this.$then = [];
        this.set(val || obj[key]);
    };
    
    var proto = act.Property.prototype;
        
    /**
     * Set Property
     */
    proto.set = function (val) {
        var self = this;
        if (this.$object[this.$key] !== val) {
            
            /**
             * Async Properties
             */
            if (val instanceof act.Async) {
                return val.then(function (result) {
                    self.set(result);
                });
            }
            
            /**
             * Calculated Properties
             */
            if (val instanceof act.Calculation) {
                this.$run = function () {
                    self.set(val.$run());
                };
                return this.$run();
            }
            
            /**
             * Normal Properties
             */
            this.$object[this.$key] = val;
                
            this.$then.forEach(function (then) {
                if (typeof(then) === 'function') {
                    then(val);
                }
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

});
