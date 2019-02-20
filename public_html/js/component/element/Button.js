angular.module("prosapia").factory('Button', function () {
    function build(element) {
        newElement = document.createElement('BUTTON');
        if (element.name) {
            newElement.name = element.name;
        }
        if (element.click) {
            newElement.setAttribute("ng-click", element.click);
        }
        newElement.appendChild(document.createTextNode("Adicionar"));
        if (element.class) {
            newElement.className = element.class;
        }

        return newElement;
    }
    return build;
});