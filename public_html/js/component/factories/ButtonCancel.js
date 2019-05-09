angular.module("prosapia").factory('ButtonCancel', function () {

    function build(elmInfo) {
        let buttonCancel = document.createElement('button-directive');
        buttonCancel.name = "buttonCancel";
        if (elmInfo.click) {
            buttonCancel.setAttribute("ng-click", elmInfo.click);
        }
//        else if (elmInfo.returnTo) {
//            buttonCancel.setAttribute("ng-click", "cancelOperation(\'" + elmInfo.returnTo + "\')");
//        }
        buttonCancel.setAttribute("label", "Cancelar")
        buttonCancel.setAttribute("type", "CANCEL");
        buttonCancel.className = "camcelButton";
        return buttonCancel;
    }
    return build;
});