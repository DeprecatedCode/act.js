require(['act'], function (act) {
    
    /**
     * Tick function
     */
    act.$tick = function (delay) {
        var async = new act.Async();
        async.$timeout = setInterval(async.fire.bind(async), 1000 * delay);
        return async;
    };
    
    /**
     * Wait function
     */
    act.$wait = function (delay) {
        var async = new act.Async();
        async.$timeout = setTimeout(async.fire.bind(async), 1000 * delay);
        return async;
    };

    /**
     * Async class
     */
    act.Async = function () {
        this.$then = [];
    };
    
    var proto = act.Async.prototype;

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

});
