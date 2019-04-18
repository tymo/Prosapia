angular.module("prosapia").factory('dyGrid', function ($compile, Store) {
    this.id = null;
    this.tableName = null;
    this.eventBus = null;
    this.scope = {};
    this.columnList = null;
    this.modelList = null;
    this.tableHeader = null;
    this.addForm = null;
    this.elements = [];

    this.clear = function () {
        this.id = null;
        this.tableName = null;
        this.eventBus = null;
        this.scope = {};
        this.columnList = null;
        this.modelList = null;
        this.tableHeader = null;
        this.addForm = null;
        this.elements = [];
    }

    this.setId = function (id) {
        this.id = id;
        return this;
    }

    this.setListName = function (listName) {
        this.listName = listName;
        return this;
    }

    this.setGridBuilder = function (gridName) {
        this.gridName = gridName;
        return this;
    }

    this.setTableHeader = function (tableHeader) {
        this.tableHeader = tableHeader;
        return this;
    }

    this.setEventBus = function (eventBus) {
        this.eventBus = eventBus;
        return this;
    }

    this.setAddForm = function (addForm) {
        this.addForm = addForm;
    }

    this.setColumnListName = function (columnListName) {
        this.columnList = columnListName;
        return this;
    }

    this.addColumn = function (col) {
        if (this.columnList) {
            Store.addItem(this.columnList, col);
        } else {
            console.warn("Column list name was not set. Please set myGrid.setColumnListName('Name') before adding columns to myGrid!");
        }
        return this;
    }

    this.setModelListName = function (modelListName) {
        this.modelList = modelListName;
        return this;
    }

    this.addModel = function (model) {
        if (this.modelList) {
            Store.addItem(this.modelList, model);
        } else {
            console.warn("Model list name was not set. Please set myGrid.setModelListName('Name') before adding models to myGrid!");
        }
        return this;
    }

    this.setScope = function (scope) {
        this.scope = scope;
        return this;
    }

    this.addElement = function (element) {
        if (this.fieldsResourceName) {
            if (element) {
                Store.addItem(this.fieldsResourceName, element);
            }
        } else {
            console.warn("Field resource name was not set. Please set myform.setFieldsResourceName('Name') before adding fields to myForm!");
        }
        return this;
    }

    this.build = function () {
        let newGrid = document.createElement('grid-builder');
        newGrid.setAttribute("table-header", this.tableHeader);
        newGrid.setAttribute("list-name", this.listName);
        newGrid.setAttribute("event-bus", "eventBus");
        newGrid.setAttribute("grid-name", this.gridName);
        newGrid.setAttribute("column-list", this.columnList);
        newGrid.setAttribute("model-list", this.modelList);
        newGrid.setAttribute("add-form", this.addForm);
        $compile(newGrid)(this.scope);
        this.clear();
    }

    return this;
});