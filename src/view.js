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
            this.$run = this.$show.bind(this);
            this.$initialized = false;
        };
        
        var proto = pkg.View.prototype;
        
        /**
         * Show view
         */
        proto.$show = function (node, reinit) {
            if (node) {
                node.appendChild(this.$node);
            }
            if (reinit === false && this.$initialized) {
                return;
            }
            this.$node.innerHTML = '';
            if (typeof this.$view === 'function') {
                this.$view(this);
            }
            this.$initialized = true;
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
         * Add view on node
         */
        proto.view = function (view) {
            view.$show(this.$node, false);
            return view;
        };
        
        /**
         * Set node text
         */
        proto.text = function (text) {
            this.$node.innerText = text;
            return this;
        };
        
        /**
         * Set node html
         */
        proto.html = function (html) {
            this.$node.innerHtml = html;
            return this;
        };
        
        /**
         * Set node click
         */
        proto.click = function (click) {
            this.$node.addEventListener('click', click);
            return this;
        };
        
    })(act);
    
    /*** @module.end ***/

});
