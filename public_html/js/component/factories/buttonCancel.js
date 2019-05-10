angular.module("prosapia").factory('buttonCancel', function () {

    function build(elmInfo) {
        let buttonCancel = document.createElement('button-directive');
        buttonCancel.name = "buttonCancel";
        if (elmInfo.click) {
            buttonCancel.setAttribute("ng-click", elmInfo.click);
        }
        buttonCancel.setAttribute("label", "Cancelar")
        buttonCancel.setAttribute("type", "CANCEL");
        buttonCancel.className = "camcelButton";
        return buttonCancel;
    }
    return build;
});