angular.module("prosapia").factory('dyTextInput', function () {
    this._name = null;
    this._model = null;
    this._placeHolder = null;
    this._eType = null;
    this.newElement = null;

    this.name = function (name) {
        this._name = name;
        return this;
    }
    this.model = function(model) {
        this._model = model;
        return this;
    }
    this.placeHolder = function(placeHolder) {
        this._placeHolder = placeHolder;
        return this;
    }
    this.eType = function(eType) {
        this._eType = eType;
        return this;
    }
    this.build = function() {
        this.newElement = document.createElement('INPUT');
        if (this._name) {
            this.newElement.name = this._name;
        }
        if (this._model) {
            this.newElement.setAttribute("ng-model", "data." + this._model);
        }
        if (this._placeHolder) {
            this.newElement.setAttribute('placeHolder', this._placeHolder);
        }
        if (this._eType) {
            this.newElement.type = this._eType;
        }
        return this.newElement;
    }
    return this;
});