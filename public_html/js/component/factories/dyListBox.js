angular.module("prosapia").factory('dyListBox', function (FormElement) {
    this.model = null;
    this.scope = null;
    this.listName = null;
    this.columnList = null;
    this.label = null;
    this.name = null;
    this.trackBy = null;
    this.required = null;
    this.selItem = null;
    this.eventBus = null;
    this.newElement = null;

    this.clear = function () {
        this.model = null;
        this.scope = null;
        this.listName = null;
        this.columnList = null;
        this.label = null;
        this.trackBy = null;
        this.name = null;
        this.eventBus = null;
        this.newElement = null;
    }

    this.setModel = function (model) {
        this.model = model;
        this.name = model;
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
    this.setEventBus = function (eventBus) {
        this.eventBus = eventBus;
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
    this.setRequired = function (required) {
        this.required = required;
        return this;
    }
    this.setSelItem = function (selItem) {
        this.selItem = selItem;
        return this;
    }
    this.build = function () {
        this.type = FormElement.SELECT;
        return {type: FormElement.SELECT, model: this.model, listName: this.listName, columnList: this.columnList, placeHolder: this.label, name: this.name, required: this.required, eventBus: this.eventBus, trackBy: this.trackBy};
    }

    return this;
});