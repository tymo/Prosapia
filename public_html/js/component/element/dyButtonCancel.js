angular.module("prosapia").factory('dyButtonCancel', function (FormElement) {
    this.returnTo = null;
    this.click = null;

    this.clear = function () {
        this.returnTo = null;
        this.click = null;
    }

    this.setReturnTo = function (returnYo) {
        this.returnTo = returnYo;
        return this;
    }

    this.setClick = function (click) {
        this.click = click;
        return this;
    }

    this.build = function () {
        this.type = FormElement.BUTTONCANCEL;
        if (this.click) {
            return {type: FormElement.BUTTONCANCEL, click: this.click};
        } else {
            return {type: FormElement.BUTTONCANCEL, returnTo: this.returnTo};
        }
    }

    return this;
});