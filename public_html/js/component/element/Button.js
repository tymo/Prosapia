angular.module("prosapia").factory('Button', function () {

    function build(element) {
        newElement = document.createElement('BUTTON');
        newElement.name = "addButton";
        newElement.type = "submit";
        if (element.listName) {
            if (element.modList) {
                newElement.setAttribute("ng-click", "addItem(\'" + element.listName + "\', data, \'" + element.modList + "\')");
            } else {
                newElement.setAttribute("ng-click", "addItem(\'" + element.listName + "\', data)");
            }
        }
        newElement.appendChild(document.createTextNode("Enviar"));
        newElement.className = "addButton";
        return newElement;
    }
    return build;
});