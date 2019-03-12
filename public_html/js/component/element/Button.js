angular.module("prosapia").factory('Button', function () {

    function build(element) {
        newElement = document.createElement('BUTTON');
        newElement.name = "addButton";
        if (element.listName) {
            if (element.modList) {
                newElement.setAttribute("ng-click", "addItem(\'" + element.listName + "\', data, \'" + element.modList + "\')");
            } else {    
                newElement.setAttribute("ng-click", "addItem(\'" + element.listName + "\', data)");
            }
        }
        newElement.appendChild(document.createTextNode("Adicionar"));
        newElement.className = "addButton";
        return newElement;
    }
    return build;
});