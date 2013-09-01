require(['act'], function (act) {
    
    /**
     * View function
     */
    act.$view = function (view, type) {
        return new act.View(view, type);
    };

    /**
     * View class
     */
    act.View = function (view, type) {
        this.$view = view;
        this.$node = document.createElement(type || 'div');
    };
    
    var proto = act.View.prototype;
    
    /**
     * Show view
     */
    proto.$show = function (node) {
        node.appendChild(this.$node);
        this.$node.innerHTML = '';
        if (typeof this.$view === 'function') {
            this.$view(this);
        }
    };
        
    /**
     * New node on node
     */
    proto.node = function (type) {
        var n = new act.View(null, type);
        this.$node.appendChild(n.$node);
        return n;
    };
    
    /**
     * Set node text
     */
    proto.text = function (text) {
        this.$node.innerText = text;
    };

});
