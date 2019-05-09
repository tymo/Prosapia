angular.module("prosapia").factory('dyButton', function (FormElement) {
    this.listName = null;
    this.modList = null;
    this.modItem = null;
    this.modValue = null;
    this.modOpr = null;
    this.click = null;

    this.clear = function () {
        this.listName = null;
        this.modList = null;
        this.modItem = null;
        this.modValue = null;
        this.modOpr = null;
        this.click = null;
    }

    this.setListName = function (listName) {
        this.listName = listName;
        return this;
    }

    this.setModList = function (modList) {
        this.modList = modList;
        return this;
    }

    this.setModItem = function (modItem) {
        this.modItem = modItem;
        return this;
    }

    this.setModValue = function (nodValue) {
        this.nodValue = nodValue;
        return this;
    }

    this.setModOpr = function (nodOpr) {
        this.nodOpr = nodOpr;
        return this;
    }

    this.setClick = function (click) {
        this.click = click;
        return this;
    }

    this.build = function () {
        this.type = FormElement.BUTTONSUBMIT;
        if (this.click) {
            return {type: FormElement.BUTTONSUBMIT, click: this.click};
        } else {
            return {type: FormElement.BUTTONSUBMIT, listName: this.listName, modList: this.modList, modItem: this.modItem, modValue: this.modValue, modOpr: this.modOpr};
        }
    }

    return this;
});