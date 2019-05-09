angular.module("prosapia").directive('inputBuilderDirective', function ($compile, FormElement, Store) {
    return {
        scope: {
            name: "@",
            eventBus: "=",
            fieldsResourceName: "@",
            listName: "@",
            returnTo: "@"
        },
        link: link
    };
    function link(scope) {
        scope.errorList = null;
        scope.getAllElementsWithAttribute = function (attribute)
        {
            let matchingElements = [];
            let allElements = document.getElementsByTagName('*');
            for (var i = 0, n = allElements.length; i < n; i++)
            {
                if (allElements[i].getAttribute(attribute) !== null)
                {
                    // Element exists with attribute to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }
        const ERROR = 0;
        const REFRESH = 1;
        scope.addError = function (params) {
            if (!scope.errorList) {
                scope.errorList = [];
            }
            scope.errorList.push(params[ERROR]);
            if (params[REFRESH]) {
                scope.refreshErrorList();
            }
        }
        scope.refreshErrorList = function () {
            if (scope.errorList) {
                let div = document.createElement('DIV');
                div.id = "errorDiv";
                div.className = "alert alert-danger";
                scope.errorList.forEach(function (errMsg) {
                    div.appendChild(document.createTextNode(errMsg));
                    div.appendChild(document.createElement("BR"));
                });
                scope.errorList = null;
                if (document.getElementById("errorDiv")) {
                    scope.formElement.removeChild(document.getElementById("errorDiv"));
                }
                scope.formElement.prepend(div);
            } else {
                if (document.getElementById("errorDiv")) {
                    scope.formElement.removeChild(document.getElementById("errorDiv"));
                }
            }
        }
        scope.validateFormInput = function () {
            let valid = true;
            scope.Store.getList(scope.fieldsResourceName).forEach(function (elmInfo) {
                if (!elmInfo.disabled && elmInfo.required) {
                    if (elmInfo.type === FormElement.SELECT) {
                        let elmList = scope.getAllElementsWithAttribute("ng-model");
                        elmList.forEach(function (elem) {
                            if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                if (!angular.element(elem).scope().handler().getSelectedItem()) {
                                    valid = false;
                                    scope.addError(["Por favor " + elmInfo.placeHolder, false]);
                                }
                            }
                        });
                    } else if (elmInfo.type === FormElement.TEXTINPUT) {
                        let elmList = scope.getAllElementsWithAttribute("ng-model");
                        elmList.forEach(function (elem) {
                            if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                if (!angular.element(elem).scope().handler().getValue()) {
                                    valid = false;
                                    scope.addError(["Por favor preencha o campo " + elmInfo.placeHolder, false]);
                                }
                            }
                        });
                    } else {
                        if (scope[scope.name] && scope[scope.name][elmInfo.name]) {
                            if (scope[scope.name][elmInfo.name].$invalid) {
                                valid = false;
                                scope.addError(["Por favor preencha o campo " + elmInfo.placeHolder, false]);
                            }
                        }
                    }
                }
            });
            if (!valid) {
                scope.refreshErrorList();
            }
            return valid;
        };
        scope.addItem = function (listName, data, modList, modAttName, modAttProp) {
            scope.data = data;
            if (scope.validateFormInput()) {
                if (modList && listName && scope.data) {
                    scope.Store.getList(scope.fieldsResourceName).forEach(function (elmInfo) {
                        if (elmInfo.type === FormElement.SELECT) {
                            let elmList = scope.getAllElementsWithAttribute("ng-model");
                            elmList.forEach(function (elem) {
                                if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                    if (angular.element(elem).scope().handler().getSelectedItem()) {
                                        scope.data[elmInfo.model] = angular.element(elem).scope().handler().getSelectedItem();
//                                        angular.element(elem).scope().handler().clearSelection();
                                    }
                                }
                            });
                        } else if (elmInfo.type === FormElement.TEXTINPUT) {
                            let elmList = scope.getAllElementsWithAttribute("ng-model");
                            elmList.forEach(function (elem) {
                                if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                    if (angular.element(elem).scope().handler().getValue()) {
                                        scope.data[elmInfo.model] = angular.element(elem).scope().handler().getValue();
                                    }
                                }
                            });
                        }
                    });
                    scope.eventBus.fireEvent("addItem", [listName, scope.data, modList, modAttName, modAttProp]);
                } else if (listName && scope.data) {
                    scope.Store.getList(scope.fieldsResourceName).forEach(function (elmInfo) {
                        if (elmInfo.type === FormElement.SELECT) {
                            let elmList = scope.getAllElementsWithAttribute("ng-model");
                            elmList.forEach(function (elem) {
                                if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                    if (angular.element(elem).scope().handler().getSelectedItem()) {
                                        scope.data[elmInfo.model] = angular.element(elem).scope().handler().getSelectedItem();
                                    }
                                }
                            });
                        } else if (elmInfo.type === FormElement.TEXTINPUT) {
                            let elmList = scope.getAllElementsWithAttribute("ng-model");
                            elmList.forEach(function (elem) {
                                if (elem.getAttribute("ng-model") === ("data." + elmInfo.model)) {
                                    if (angular.element(elem).scope().handler().getValue()) {
                                        scope.data[elmInfo.model] = angular.element(elem).scope().handler().getValue();
                                    }
                                }
                            });
                        }
                    });
                    scope.eventBus.fireEvent("addItem", [listName, scope.data]);
                    if (scope.returnTo) {
                        scope.eventBus.fireEvent(scope.returnTo);
                    }
                }
            }
        };
        scope.cancelOperation = function (returnTo) {
            scope.eventBus.fireEvent(returnTo);
        };
        scope.combine = function (params) {
            let comb = "";
            params.forEach(function (param) {
                if (comb !== "") {
                    comb += "/";
                }
                comb += param;
            })
            return comb;
        };
        scope.formElement = document.createElement("FORM");
        scope.formElement.setAttribute("novalidate", true);
        scope.Store = Store;
        scope.Store.subscribe("validateFormInput", scope.validateFormInput);
        scope.formElement.name = scope.name;
        if (!scope.data) {
            scope.data = {};
        }
        scope.Store.getList(scope.fieldsResourceName).forEach(function (elmInfo) {
            elmInfo.scope = scope;
            elmInfo.Store = scope.Store;
            let newElement = FormElement.getElement(elmInfo, scope);
            if (newElement) {
                scope.formElement.appendChild(newElement);
                if (elmInfo.type !== FormElement.BUTTONSUBMIT) {
                    scope.formElement.appendChild(document.createElement("BR"));
                }
            }
        });
        $compile(scope.formElement)(scope);

        scope.eventBus.addListener("refreshErrorList", scope.refreshErrorList);
        scope.eventBus.addListener("addError", scope.addError);
        scope.eventBus.fireEvent("hideAddBtn");
        scope.eventBus.fireEvent("displayContent", [scope.formElement, false]);
    }
});