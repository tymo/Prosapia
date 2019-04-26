angular.module("prosapia").directive('inputBuilder', function ($compile, FormElement, Store) {
    return {
        scope: {
            name: "@",
            eventBus: "=",
            fieldsResourceName: "@",
            listName: "=",
            returnTo: "@"
        },
        link: link
    };
    function link(scope) {
        scope.errorList = null;
        scope.getAllElementsWithAttribute = function (attribute)
        {
            var matchingElements = [];
            var allElements = document.getElementsByTagName('*');
            for (var i = 0, n = allElements.length; i < n; i++)
            {
                if (allElements[i].getAttribute(attribute) !== null)
                {
                    // Element exists with attribute. Add to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }
        scope.validateFormInput = function () {
            let valid = true;
            scope.Store.getList(scope.fieldsResourceName).forEach(function (elmInfo) {
                if (elmInfo.type === FormElement.SELECT) {
                    let elmList = scope.getAllElementsWithAttribute("ng-model");
                    elmList.forEach(function (elem) {
                        if (elmInfo.required) {
                            if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                if (!angular.element(elem).scope().handler().getSelectedItem()) {
                                    valid = false;
                                    if (scope.errorList) {
                                        scope.errorList.push("Por favor " + elmInfo.placeHolder);
                                    } else {
                                        scope.errorList = []
                                        scope.errorList.push("Por favor " + elmInfo.placeHolder);
                                    }
                                }
                            }
                        }
                    });
                } else {
                    if (scope[scope.name] && scope[scope.name][elmInfo.name]) {
                        if (scope[scope.name][elmInfo.name].$invalid) {
                            valid = false;
                            if (scope.errorList) {
                                scope.errorList.push("Por favor preencha o campo " + elmInfo.placeHolder);
                            } else {
                                scope.errorList = [];
                                scope.errorList.push("Por favor preencha o campo " + elmInfo.placeHolder);
                            }
                        }
                    }
                }
            });
            if (!valid) {
                let div = document.createElement('DIV');
                div.id = "errorDiv";
                div.className = "alert alert-danger";
                scope.errorList.forEach(function (errMsg) {
                    div.appendChild(document.createTextNode(errMsg));
                    div.appendChild(document.createElement("BR"));
                });
                scope.errorList = null;
                if (document.getElementById("errorDiv")) {
                    scope.newForm.removeChild(document.getElementById("errorDiv"));
                }
//                if (!document.getElementById("errorDiv")) {
                scope.newForm.prepend(div);
//                }
            } else {
                if (document.getElementById("errorDiv")) {
                    scope.newForm.removeChild(document.getElementById("errorDiv"));
                }
            }
            return valid;
        };
        scope.addItem = function (listName, data, modList) {
            scope.data = data;
//            if (scope[scope.name].$valid) {
            if (scope.validateFormInput()) {
                if (modList && listName && scope.data) {
                    scope.Store.getList(scope.fieldsResourceName).forEach(function (elementInfo) {
                        if (elementInfo.type === FormElement.SELECT) {
                            let elmList = scope.getAllElementsWithAttribute("ng-model");
                            elmList.forEach(function (elem) {
                                if (elem.getAttribute("ng-model") === ("data." + elementInfo.model)) {
                                    if (angular.element(elem).scope().handler().getSelectedItem()) {
                                        scope.data[elementInfo.model] = angular.element(elem).scope().handler().getSelectedItem();
                                        angular.element(elem).scope().handler().clearSelection();
                                    }
                                }
                            });
                        }
                    });
                    scope.eventBus.fireEvent("addItem", [listName, data, modList]);
                } else if (listName && scope.data) {
                    scope.Store.getList(scope.fieldsResourceName).forEach(function (elementInfo) {
                        if (elementInfo.type === FormElement.SELECT) {
                            let elmList = scope.getAllElementsWithAttribute("ng-model");
                            elmList.forEach(function (elem) {
                                if (elem.getAttribute("ng-model") === ("data." + elementInfo.model)) {
                                    if (angular.element(elem).scope().handler().getSelectedItem()) {
                                        scope.data[elementInfo.model] = angular.element(elem).scope().handler().getSelectedItem();
//                                        angular.element(elem).scope().handler().clearSelection();
                                    } else {
                                        scope.data[elementInfo.model] = null;
                                    }
                                }
                            })
                        }
                    });
                    scope.eventBus.fireEvent("addItem", [listName, scope.data]);
                    if (scope.returnTo) {
                        scope.eventBus.fireEvent(scope.returnTo);
                    }
                }
            }
        }
        scope.combine = function (params) {
            let comb = "";
            params.forEach(function (param) {
                if (comb !== "") {
                    comb += "/";
                }
                comb += param;
            })
            return comb;
        }
        scope.newForm = document.createElement("FORM");
        scope.newForm.setAttribute("novalidate", true);
        scope.Store = Store;
        scope.Store.subscribe("validateFormInput", scope.validateFormInput);
        scope.newForm.name = scope.name;
        if (!scope.data) {
            scope.data = {};
        }
        scope.Store.getList(scope.fieldsResourceName).forEach(function (elementInfo) {
            elementInfo.scope = scope;
            elementInfo.Store = scope.Store;
            let newElement = FormElement.getElement(elementInfo, scope);
            if (newElement) {
                scope.newForm.appendChild(newElement);
                scope.newForm.appendChild(document.createElement("BR"));
            }
        });
        $compile(scope.newForm)(scope);
        scope.eventBus.fireEvent("decSelectedItemCount", true);
        scope.eventBus.fireEvent("hideAddBtn");
        scope.eventBus.fireEvent("displayContent", [scope.newForm, false]);
    }
});