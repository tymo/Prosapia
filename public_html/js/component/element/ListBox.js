angular.module("prosapia").factory('ListBox', function () {
    function build(element) {
        newElement = document.createElement('SELECT');
        if (element.model) {
            newElement.setAttribute("ng-model", "data." + element.model);
        }
        if (element.options) {
            newElement.setAttribute("ng-options", element.options);
            opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(element.option));
            opt.setAttribute("value", "");
            opt.setAttribute("label", element.option);
            newElement.appendChild(opt);
        }
        return newElement;
    }
    return build;
});