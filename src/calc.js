define(['src/act'], function (act) {
    
    /*** @module.start ***/
    
    (function (pkg) {
    
        /**
         * Calc function
         */
        pkg.$calc = function (calc) {
            return new pkg.Calculation(calc);
        };
    
        /**
         * Calculation class
         */
        pkg.Calculation = function (calc) {
            this.$run = calc;
        };
        
    })(act);
    
    /*** @module.end ***/

});
