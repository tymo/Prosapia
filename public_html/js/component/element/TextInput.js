angular.module("prosapia").factory('TextInput', function () {
    function build(element) {
        newElement = document.createElement('INPUT');
        if (element.name) {
            newElement.name = element.name;
        }
        if (element.model) {
            newElement.setAttribute("ng-model", "data." + element.model);
        }
        if (element.placeHolder) {
            newElement.setAttribute('placeHolder', element.placeHolder);
        }
        if (element.eType) {
            newElement.type = element.eType;
        }        
        return newElement;
    }
    return build;
});