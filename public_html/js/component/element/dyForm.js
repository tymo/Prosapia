angular.module("prosapia").factory('dyForm', function ($compile, List) {
    this.id = null;
    this.listName = null;
    this.eventBus = null;
    this.elmListName = null
    this.scope = null;
    this.elements = [];

    this.setId = function (id) {
        this.id = id;
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

    this.setElementListName = function (elementsList) {
        this.elmListName = elementsList;
        return this;
    }

    this.setScope = function (scope) {
        this.scope = scope;
        return this;
    }

    this.addElement = function (element) {
        if (element) {
            this.elements.push(element);
        }
        return this;
    }

    this.addElementTo = function (listName, element) {
        if (element) {
            List.getList(listName).push(element);
        }
        return this;
    }

    this.build = function () {
        let newForm = document.createElement('input-builder');
        newForm.setAttribute("id", this.id);
        newForm.setAttribute("event-bus", this.eventBus);
//        newForm.setAttribute("input-fields", this.elements);
        newForm.setAttribute("input-fields", this.elmListName);
        newForm.setAttribute("list-name", this.listName);
        $compile(newForm)(this.scope);
    }

    return this;
});