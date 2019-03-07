angular.module("prosapia").factory('dyTextInput', function (FormElement) {
    this.name = null;
    this.model = null;
    this.placeHolder = null;
    this.eType = null;

    this.setName = function (name) {
        this.name = name;
        return this;
    }
    this.setModel = function (model) {
        this.model = model;
        return this;
    }
    this.setPlaceHolder = function (placeHolder) {
        this.placeHolder = placeHolder;
        return this;
    }
    this.setEType = function (eType) {
        this.eType = eType;
        return this;
    }
    this.build = function () {
        this.type = FormElement.TEXTINPUT;
//        return this;
        return {type: FormElement.TEXTINPUT, name: this.name, model: this.model, placeHolder: this.placeHolder, eType: this.eType};
    }
    return this;
});