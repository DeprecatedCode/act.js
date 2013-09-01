require(['act'], function (act) {
    
    /**
     * Control function
     */
    act.$ctrl = function (name, definition) {
        var key = '_$result';
        var ctrl = new act.Control(name);
        var val = definition(ctrl);
        act.$ctrl[name] = val;
        var prop = act.$prop(ctrl, key, val);
        prop.then(function (val) {
            act.$ctrl[name] = val;
        });
        ctrl.$scan();
        return ctrl;
    };
    
    /**
     * Control Class
     */
    act.Control = function (name) {
        this.$name = name;
        this.$prop = {};
        this.$running = false;
    };
    
    var proto = act.Control.prototype;
        
    /**
     * Control: scan
     */
    proto.$scan = function () {
        this.$running = true;
        for (var key in this) {
            if (!this.hasOwnProperty(key) || key[0] === '$') {
                continue;
            }
            if (!this.$prop[key]) {
                var prop = new act.Property(this, key);
                this.$prop[key] = prop;
            }
        }
        this.$running = false;
        this.$run();
    };
    
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
                var val = this.$prop[key];
                var current = this[key];
                if (val.$run) {
                    val.$run();
                    if (current != this[key]) {
                        dirty = true;
                        console.log(current, '-->', val.$value);
                    }
                    stack.push(val.$key);
                }
            }
            
            if (!dirty) {
                break;
            }
        }

        this.$running = false;
    };
    
});
