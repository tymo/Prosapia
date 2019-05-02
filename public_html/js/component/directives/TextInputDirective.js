angular.module("prosapia").directive('textInputDirective', function ($compile, Store) {
    return {
        scope: {
            name: "@",
            type: "@",
            ngModel: "@",
            placeHolder: "@",
            disabled: "@",
            required: "@"
        },
        link: link
    };
    function link(scope, element) {
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
                Store.set("validateFormInput");
            });
        }
        $compile(newTextInput)(scope);
        element.append(newTextInput);
    }
});