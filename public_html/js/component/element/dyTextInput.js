angular.module("prosapia").factory('dyTextInput', function (FormElement) {
    this.name = null;
    this.model = null;
    this.placeHolder = null;
    this.disabled = null;
    this.required = null;
    this.value = null;
    this.eType = null;

    this.clear = function () {
        this.name = null;
        this.model = null;
        this.placeHolder = null;
        this.value = null;
        this.scope = null;
        this.eType = null;
        this.disabled = null;
        this.required = null;
    }

    this.setName = function (name) {
        this.name = name;
        return this;
    }

    this.setScope = function (scope) {
        this.scope = scope;
        return this;
    }

    this.setModel = function (model) {
        this.model = model;
        return this;
    }

    this.setDisabled = function (disabled) {
        this.disabled = disabled;
        return this;
    }

    this.setRequired = function (required) {
        this.required = required;
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

    this.setValue = function (value) {
        this.value = value;
        return this;
    }

    this.build = function () {
        this.type = FormElement.TEXTINPUT;
        let inp = angular.copy({type: FormElement.TEXTINPUT, name: this.name, model: this.model, placeHolder: this.placeHolder, value: this.value, eType: this.eType, disabled: this.disabled, required: this.required});
        this.clear();
        return inp;
    }

    return this;
});