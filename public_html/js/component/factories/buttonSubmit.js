angular.module("prosapia").factory('buttonSubmit', function () {

    function build(elmInfo) {
        buttonSubmit = document.createElement('button-directive');
        if (elmInfo.click) {
            buttonSubmit.setAttribute("ng-click", elmInfo.click);
        }
        buttonSubmit.setAttribute("label", "Salvar");
        buttonSubmit.setAttribute("type", "SUBMIT");
        return buttonSubmit;
    }
    return build;
});