angular.module("prosapia").factory('dyButtonCancel', function (FormElement) {
    this.returnTo  = null;

    this.clear = function () {
        this.returnTo = null;
    }
    
    this.setReturnTo = function (returnYo) {
        this.returnTo = returnYo;
        return this;
    }

    this.build = function () {
        this.type = FormElement.BUTTONSUBMIT;
        return {type: FormElement.BUTTONCANCEL, returnTo: this.returnTo};
    }

    return this;
});