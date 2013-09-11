define(['src/act'], function (act) {
    
    /*** @module.start ***/
    
    (function (pkg) {
    
        /**
         * Tick function
         */
        pkg.$tick = function (delay) {
            var async = new pkg.Async();
            async.$timeout = setInterval(async.fire.bind(async), 1000 * delay);
            return async;
        };
        
        /**
         * Wait function
         */
        pkg.$wait = function (delay) {
            var async = new pkg.Async();
            async.$timeout = setTimeout(async.fire.bind(async), 1000 * delay);
            return async;
        };
        
        /**
         * Now function
         */
        pkg.$now = function (value) {
            var async = new pkg.Async(value);
            async.$immediate = true;
            return async;
        };
    
        /**
         * Async class
         */
        pkg.Async = function (value) {
            this.$then = [];
            this.$postfire = [];
            this.$onupdate = [];
            this.$value = value;
        };
        
        var proto = pkg.Async.prototype;
    
        /**
         * Chain wait
         */
        proto.$wait = function (delay, timeoutFn) {
            var async = new pkg.Async(this.$value);
            var fn = function () {
                async.$timeout = (timeoutFn || setTimeout)(async.fire.bind(async), 1000 * delay);
            };
            async.$parent = this;
            this.$child = async;
            this.$postfire.push(fn);
            if (this.$immediate) {
                this.propagate(this.$value);
            }
            return async;
        };
    
        /**
         * Chain tick
         */
        proto.$tick = function (delay) {
            return this.$wait(delay, setInterval);
        };
        
        /**
         * Propagate value to child
         */
        proto.propagate = function (value, depth) {
            
            depth = depth || 0;

            this.$value = value;

            if (depth === 0) {
                this.$postfire.forEach(function (fn) {
                    typeof fn === 'function' && fn();
                });
            }
            
            this.$onupdate.forEach(function (fn) {
                typeof fn === 'function' && fn();
            });
            
            if (this.$child) {
                this.$child.propagate(value, depth + 1);
            }
        };
    
        /**
         * Fire Async
         */
        proto.fire = function () {
            var value;
            
            this.$then.forEach(function (then) {
                if (typeof(then) === 'function') {
                    value = then(value);
                }
                else {
                    value = then;
                }
            });

            this.propagate(value);

            return this;
        };
        
        /**
         * Add to then chain
         */
        proto.then = function (then) {
            this.$then.push(then);
            if (this.$immediate && typeof then === 'function') {
                this.$value = then(this.$value);
            }
            return this;
        };
        
        /**
         * Cancel timeout
         */
        proto.cancel = function () {
            clearTimeout(this.$timeout);
            if (this.$parent) {
                this.$parent.cancel();
            }
            return this;
        };
        
    })(act);
    
    /*** @module.end ***/

});
