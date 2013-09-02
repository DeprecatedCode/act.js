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
         * Async class
         */
        pkg.Async = function () {
            this.$then = [];
        };
        
        var proto = pkg.Async.prototype;
    
        /**
         * Set Async
         */
        proto.fire = function () {
            var result = null;
            this.$then.forEach(function (then) {
                if (typeof(then) === 'function') {
                    result = then(result);
                }
                else {
                    result = then;
                }
            });
        };
        
        /**
         * Add to then chain
         */
        proto.then = function (then) {
            this.$then.push(then);
            return this;
        };
        
        /**
         * Cancel timeout
         */
        proto.cancel = function () {
            clearTimeout(this.$timeout);
            return this;
        };
        
    })(act);
    
    /*** @module.end ***/

});
