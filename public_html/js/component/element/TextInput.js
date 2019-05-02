angular.module("prosapia").factory('TextInput', function () {
    function build(elmInf) {
        let textInput = document.createElement('text-input-directive');
        if (elmInf.name) {
            textInput.setAttribute("name", elmInf.name);
        }
        if (elmInf.model) {
            textInput.setAttribute("ng-model", elmInf.model);
        }
        if (elmInf.eType) {
            textInput.setAttribute("type", elmInf.eType);
        }
        if (elmInf.placeHolder) {
            textInput.setAttribute('placeHolder', elmInf.placeHolder);
        }
        if (elmInf.disabled) {
            textInput.setAttribute("disabled", "true");
        }
        if (elmInf.required) {
            textInput.setAttribute("required", "true");
        }
        return textInput;
    }
    return build;
});