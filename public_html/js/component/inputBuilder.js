angular.module("prosapia").directive('inputBuilder', function ($compile, FormElement, List) {
    return {
        scope: {
            id: "@",
            eventBus: "=",
            inputFields: "@",
            listName: "="
        },
        link: link
    };
    function link(scope) {
        newForm = document.createElement('FORM');
        newForm.name = 'newForm';
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
//        scope.inputFields.forEach(function (input) {
        scope.List.getList(scope.inputFields).forEach(function (input) {
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