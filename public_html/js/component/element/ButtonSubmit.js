angular.module("prosapia").factory('ButtonSubmit', function () {

    function build(elmInfo) {
        buttonSubmit = document.createElement('button-directive');
        if (elmInfo.listName) {
            if (elmInfo.modList) {
                buttonSubmit.setAttribute("ng-click", "addItem(\'" + elmInfo.listName + "\', data, \'" + elmInfo.modList + "\')");
            } else {
                buttonSubmit.setAttribute("ng-click", "addItem(\'" + elmInfo.listName + "\', data)");
            }
        }
        buttonSubmit.setAttribute("label", "Salvar");
        buttonSubmit.setAttribute("type", "SUBMIT");
        return buttonSubmit;
    }
    return build;
});