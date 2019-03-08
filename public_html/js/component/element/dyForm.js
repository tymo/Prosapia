angular.module("prosapia").factory('dyForm', function ($compile, List) {
    this.id = null;
    this.listName = null;
    this.eventBus = null;
    this.fieldsResourceName = null
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

    this.setFieldsResourceName = function (fieldsResourceName) {
        this.fieldsResourceName = fieldsResourceName;
        return this;
    }

    this.setScope = function (scope) {
        this.scope = scope;
        return this;
    }
    
    this.addElement = function (element) {
        if (this.fieldsResourceName) {
            if (element) {
                List.addItem(this.fieldsResourceName, element);
            }
        } else {
            console.warn("Field resource name was not set. Please set myform.setFieldsResourceName('Name') before adding fields to myForm!");
        }
        return this;
    }

    this.build = function () {
        let newForm = document.createElement('input-builder');
        newForm.setAttribute("id", this.id);
        newForm.setAttribute("event-bus", this.eventBus);
        newForm.setAttribute("fields-resource-name", this.fieldsResourceName);
        newForm.setAttribute("list-name", this.listName);
        $compile(newForm)(this.scope);
    }

    return this;
});