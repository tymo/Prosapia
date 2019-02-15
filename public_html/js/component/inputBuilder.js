angular.module("prosapia").directive('inputBuilder', function ($compile, FormElement, List) {
    return {
        scope: {
            eventBus: "=",
            inputFields: "=",
            listName: "="
        },
        link: link
    };
    function link(scope, element) {
        newForm = document.createElement('FORM');
        newForm.name = 'newForm';
        scope.addItem = function (listName, data, $event) {
            $event.preventDefault();
            if (listName && data) {
                List.addItem(listName, data);
            }
            delete scope.data;
        }
        scope.inputFields.forEach(function (input) {
            newElement = FormElement.getElement(input);
            if (newElement) {
                newForm.appendChild(newElement);
            }
        });
        scope.List = List;
//        document.body.appendChild(newForm);
        if (scope.listName === "medicineList") {
            document.getElementById("mdcInput").appendChild(newForm);
        }
        if (scope.listName === "dosageList") {
            document.getElementById("dsgInput").appendChild(newForm);
        }
        //**
        scope.inputFields.forEach(function (input) {
            if (input.type === FormElement.BUTTONSUBMIT) {
                let btn = document.getElementById(input.id);
                if (btn) {
                    btn.setAttribute("ng-click", input.click);
                    $compile(btn)(scope);
                }
            }
            if (input.type === FormElement.TEXTINPUT) {
                let edt = document.getElementById(input.id);
                if (edt) {
                    edt.setAttribute("ng-model", "data." + input.model);
                    edt.setAttribute("placeHolder", input.placeHolder);
                    $compile(edt)(scope);
                }
            }
            if (input.type === FormElement.SELECT) {
                let slt = document.getElementById(input.id);
                if (slt) {
                    slt.setAttribute("ng-model", "data." + input.model);
                    slt.setAttribute("ng-options", input.options);
                    opt = document.createElement("OPTION");
                    opt.appendChild(document.createTextNode(input.option));
                    opt.setAttribute("value", "");
                    opt.setAttribute("label", input.option);
                    slt.appendChild(opt);
                    $compile(slt)(scope);
                }
            }
        })


//        var el = angular.element("div_id");
//        $scope = el.scope();
//        $injector = el.injector();
//        $injector.invoke(function ($compile) {
//            $compile(el)($scope)
//        })
        //**

    }
});