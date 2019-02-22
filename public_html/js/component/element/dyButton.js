angular.module("prosapia").factory('dyButton', function () {
    this._listName = null;
    this.newElement = null;
    this.base_click = "addItem(\'<listName>\', data, $event)";    

    this.listName = function (listName) {
        this._listName = listName;
        return this;
    }
    this.build = function () {
        this.newElement = document.createElement('BUTTON');
        this.newElement.appendChild(document.createTextNode("Adicionar"));
        this.newElement.className = "addButton";
        if (this._listName) {
            this.newElement.setAttribute("ng-click", this.base_click.replace("<listName>", this._listName));
        }
        return this.newElement;
    }
    return this;
});