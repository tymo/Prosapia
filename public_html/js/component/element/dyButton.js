angular.module("prosapia").factory('dyButton', function (FormElement) {
    this.listName = null;
    this.modList = null;
    this.modItem = null;
    this.modValue = null;
    this.modOpr = null;

    this.clear = function () {
        this.listName = null;
        this.modList = null;
        this.modItem = null;
        this.modValue = null;
        this.modOpr = null;
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

    this.build = function () {
        this.type = FormElement.BUTTONSUBMIT;
        return {type: FormElement.BUTTONSUBMIT, listName: this.listName, modList: this.modList, modItem: this.modItem, modValue: this.modValue, modOpr: this.modOpr};
    }

    return this;
});