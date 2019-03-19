angular.module("prosapia").factory('dyLListBox', function (FormElement) {
    this.model = null;
    this.scope = null;
    this.listName = null;
    this.columnList = null;
    this.label = null;
    this.trackBy = null;
    this.newElement = null;

    this.setModel = function (model) {
        this.model = model;
        return this;
    }
    this.setScope = function (scope) {
        this.scope = scope;
        return this;
    }
    this.setListName = function (listName) {
        this.listName = listName;
        return this;
    }
    this.setColumnList = function (columnList) {
        this.columnList = columnList;
        return this;
    }
    this.setLabel = function (label) {
        this.label = label;
        return this;
    }
    this.setTrackBy = function (trackBy) {
        this.trackBy = trackBy;
        return this;
    }

    this.build = function () {
        this.type = FormElement.SELECT;
        return {type: FormElement.SELECT, model: this.model, listName: this.listName, columnList: this.columnList, label: this.label};
    }

    return this;
});