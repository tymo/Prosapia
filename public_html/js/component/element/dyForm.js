angular.module("prosapia").factory('dyForm', function ($compile, Store, dyTextInput, dyButton, dyListBox) {
    this.id = null;
    this.listName = null;
    this.returnTo = null;
    this.eventBus = null;
    this.fieldsResourceName = null
    this.scope = null;

    this.clear = function () {
        dyTextInput.clear();
        dyListBox.clear();
        dyButton.clear();
        this.id = null;
        this.listName = null;
        this.returnTo = null;
        this.eventBus = null;
        this.fieldsResourceName = null
        this.scope = null;
    }

    this.setId = function (id) {
        this.id = id;
        return this;
    }

    this.setListName = function (listName) {
        this.listName = listName;
        return this;
    }

    this.setReturnTo = function (returnTo) {
        this.returnTo = returnTo;
        return this;
    }

    this.setEventBus = function (eventBus) {
        this.eventBus = eventBus;
        return this;
    }

    this.setFieldsResourceName = function (fieldsResourceName) {
        this.fieldsResourceName = fieldsResourceName;
        Store.initList(this.fieldsResourceName);
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
        let newForm = document.createElement('input-builder');
        newForm.setAttribute("id", this.id);
        newForm.setAttribute("event-bus", this.eventBus);
        newForm.setAttribute("fields-resource-name", this.fieldsResourceName);
        newForm.setAttribute("list-name", this.listName);
        newForm.setAttribute("return-to", this.returnTo);
        $compile(newForm)(this.scope);
        this.clear();
    }

    return this;
});