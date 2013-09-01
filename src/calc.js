require(['act'], function (act) {
    
    /**
     * Calc function
     */
    act.$calc = function (calc) {
        return new act.Calculation(calc);
    };

    /**
     * Calculation class
     */
    act.Calculation = function (calc) {
        this.$run = calc;
    };

});
