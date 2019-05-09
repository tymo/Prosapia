angular.module("prosapia").directive('textInputDirective', function ($compile, Store) {
    return {
        scope: {
            name: "@",
            type: "@",
            ngModel: "@",
            placeHolder: "@",
            disabled: "@",
            eventBus: "=",
            required: "@"
        },
        link: link
    };
    function link(scope, element) {
        scope.validateRequired = function (textBox) {
            if (!textBox.value) {
                scope.eventBus.fireEvent("addError", ["Por favor preencha o campo " + scope.placeHolder, true]);
            } else {
                scope.eventBus.fireEvent("refreshErrorList");
            }
        }
        scope.handler = function () {
            return {getValue: function () {
                    return scope.data[scope.ngModel];
                },
                clear: function () {
                    delete scope.data;
                }};
        }
        let newTextInput = document.createElement('INPUT');
        if (scope.name) {
            newTextInput.name = scope.name;
        }
        if (scope.type) {
            newTextInput.type = scope.type;
        }
        if (scope.ngModel) {
            if (!scope.data) {
                scope.data = {};
            }
            newTextInput.setAttribute("ng-model", "data." + scope.ngModel);
            if (Store.getValue(scope.ngModel)) {
                scope.data[scope.ngModel] = angular.copy(Store.getValue(scope.ngModel));
                Store.setValue(scope.ngModel, null);
            }
        }
        if (scope.placeHolder) {
            newTextInput.setAttribute('placeHolder', scope.placeHolder);
        }
        if (scope.disabled) {
            newTextInput.setAttribute("disabled", "true");
        }
        if (scope.required) {
            newTextInput.setAttribute("required", "true");
            newTextInput.addEventListener("blur", function () {
                scope.validateRequired(newTextInput);
            });
        }
        $compile(newTextInput)(scope);
        element.append(newTextInput);
    }
});