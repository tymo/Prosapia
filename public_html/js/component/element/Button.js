angular.module("prosapia").factory('Button', function () {
  
    function build(element) {
        newElement = document.createElement('BUTTON');
        newElement.name = "addButton";
        if (element.listName) {
            newElement.setAttribute("ng-click", "addItem(\'" + element.listName + "\', data, $event)");
        }
        newElement.appendChild(document.createTextNode("Adicionar"));
        newElement.className = "addButton";
        return newElement;
    }
    return build;
});