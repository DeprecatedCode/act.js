define(['src/act'], function (act) {
    
    /*** @module.start ***/
    
    (function (pkg) {
    
        /**
         * View function
         */
        pkg.$view = function (view, type) {
            return new pkg.View(view, type);
        };
    
        /**
         * View class
         */
        pkg.View = function (view, type) {
            this.$view = view;
            this.$node = document.createElement(type || 'div');
        };
        
        var proto = pkg.View.prototype;
        
        /**
         * Show view
         */
        proto.$show = proto.$run = function (node) {
            if (node) {
                node.appendChild(this.$node);
            }
            this.$node.innerHTML = '';
            if (typeof this.$view === 'function') {
                this.$view(this);
            }
        };
            
        /**
         * New node on node
         */
        proto.node = function (type) {
            var n = new pkg.View(null, type);
            this.$node.appendChild(n.$node);
            return n;
        };
        
        /**
         * Set node text
         */
        proto.text = function (text) {
            this.$node.innerText = text;
        };
        
    })(act);
    
    /*** @module.end ***/

});
