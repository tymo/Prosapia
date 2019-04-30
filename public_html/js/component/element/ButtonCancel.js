angular.module("prosapia").factory('ButtonCancel', function () {

    function build(element) {
        let buttonCancel = document.createElement('button-directive');
        buttonCancel.name = "buttonCancel";
        if (element.returnTo) {
            buttonCancel.setAttribute("ng-click", "cancelOperation(\'" + element.returnTo + "\')");
        }
        buttonCancel.setAttribute("label", "Cancelar")
        buttonCancel.setAttribute("type", "CANCEL");
        buttonCancel.className = "camcelButton";
        return buttonCancel;
    }
    return build;
});