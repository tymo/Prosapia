angular.module("prosapia").factory('TextInput', function (Store) {
    function build(eInf) {
        newTextInput = document.createElement('INPUT');
        if (eInf.name) {
            newTextInput.name = eInf.name;
        }
        if (eInf.eType) {
            newTextInput.type = eInf.eType;
        }
        if (eInf.model) {
            if (!eInf.scope.data) {
                eInf.scope.data = {};
            }
            newTextInput.setAttribute("ng-model", "data." + eInf.model);
            if (Store.getValue(eInf.model)) {
                eInf.scope.data[eInf.model] = angular.copy(Store.getValue(eInf.model));
                Store.setValue(eInf.model, null);
            }
        }
        if (eInf.placeHolder) {
            newTextInput.setAttribute('placeHolder', eInf.placeHolder);
        }
        if (eInf.disabled) {
            newTextInput.setAttribute("disabled", "true");
        }
        if (eInf.required) {
            newTextInput.setAttribute("required", "true");
            newTextInput.addEventListener("blur", function () {
                Store.set("validateFormInput");
            });
        }
        return newTextInput;
    }
    return build;
});