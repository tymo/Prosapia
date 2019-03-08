angular.module("prosapia").directive('inputBuilder', function ($compile, FormElement, List) {
    return {
        scope: {
            id: "@",
            eventBus: "=",
            fieldsResourceName: "@",
            listName: "="
        },
        link: link
    };
    function link(scope) {
        newForm = document.createElement('FORM');
        scope.addItem = function (listName, data, $event) {
            $event.preventDefault();
            if (listName && data) {
                List.addItem(listName, data);
            }
            delete scope.data;
        }
        scope.combine = function (params) {
            let comb = "";
            params.forEach(function (param) {
                if (comb != "") {
                    comb += "/";
                }
                comb += param;
            })
            return comb;
        }
        scope.List = List;
        scope.List.getList(scope.fieldsResourceName).forEach(function (input) {
            newElement = FormElement.getElement(input);
            if (newElement) {
                newForm.appendChild(newElement);
                newForm.appendChild(document.createElement("BR"));
            }
        });
        $compile(newForm)(scope);
        document.getElementById(scope.id).appendChild(newForm);
    }
});