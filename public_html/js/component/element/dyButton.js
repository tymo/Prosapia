angular.module("prosapia").factory('dyButton', function (FormElement) {
    this.listName = null;

    this.setListName = function (listName) {
        this.listName = listName;
        return this;
    }

    this.build = function () {
        this.type = FormElement.BUTTONSUBMIT;
        return this;
//        return {type: FormElement.BUTTONSUBMIT, listName: this.listName};
    }

    return this;
});