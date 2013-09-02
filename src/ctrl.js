define(['src/act'], function (act) {
    
    /*** @module.start ***/
    
    (function (pkg) {
    
        /**
         * Control function
         */
        pkg.$ctrl = function (definition) {
            var ctrl = new pkg.Control();
            definition(ctrl);
            pkg.$scan(ctrl);
            return ctrl;
        };
        
        /**
         * Control Class
         */
        pkg.Control = function () {
            this.$running = false;
        };
        
        var proto = pkg.Control.prototype;
        
        /**
         * Control: run
         */
        proto.$run = function () {
            if (this.$running) {
                return;
            }
    
            this.$running = true;
            
            var count = 0;
            var stack = [];
            while (true) {
                count ++;
                if (count > 5) {
                    throw new Error(
                        "Maximum $run loops reached: [" + stack.join(', ') + "]"
                    );
                }
                
                var dirty = false;
                
                for (var key in this.$prop) {
                    if (!this.$prop.hasOwnProperty(key) || key[0] === '$') {
                        continue;
                    }
                    var prop = this.$prop[key];
                    var current = this[key];
                    if (prop.$run) {
                        prop.$run();
                        if (current != this[key]) {
                            dirty = true;
                        }
                        stack.push(prop.$key);
                    }
                    if (current && typeof current === 'object' && current.$run) {
                        current.$run();
                    }
                }
                
                if (!dirty) {
                    break;
                }
            }
    
            this.$running = false;
        };
        
    })(act);
    
    /*** @module.end ***/
    
});
