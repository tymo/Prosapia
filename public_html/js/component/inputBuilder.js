angular.module("prosapia").directive('inputBuilder', function ($compile, FormElement, Store) {
    return {
        scope: {
            id: "@",
            eventBus: "=",
            fieldsResourceName: "@",
            listName: "=",
            returnTo: "@"
        },
        link: link
    };
    function link(scope) {
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

        scope.addItem = function (listName, data, modList) {
            if (modList && listName && data) {
                scope.Store.getList(scope.fieldsResourceName).forEach(function (elementInfo) {
                    if (elementInfo.type === FormElement.SELECT) {
                        let elmList = scope.getAllElementsWithAttribute("ng-model");
                        elmList.forEach(function (elem) {
                            if (elem.getAttribute("ng-model") === ("data." + elementInfo.model)) {
                                data[elementInfo.model] = angular.element(elem).scope().handler().getSelectedItem();
                                angular.element(elem).scope().handler().clearSelection();
                            }
                        })
                    }
                });
                scope.eventBus.fireEvent("addItem", [listName, data, modList]);
            } else if (listName && data) {
                scope.Store.getList(scope.fieldsResourceName).forEach(function (elementInfo) {
                    if (elementInfo.type === FormElement.SELECT) {
                        let elmList = scope.getAllElementsWithAttribute("ng-model");
                        elmList.forEach(function (elem) {
                            if (elem.getAttribute("ng-model") === ("data." + elementInfo.model)) {
                                data[elementInfo.model] = angular.element(elem).scope().handler().getSelectedItem();
                                angular.element(elem).scope().handler().clearSelection();
                            }
                        })
                    }
                });
                scope.eventBus.fireEvent("addItem", [listName, data]);
            }
            delete scope.data;
            if (scope.returnTo) {
                scope.eventBus.fireEvent(scope.returnTo);
            }
            scope.Store.initList(scope.fieldsResourceName);
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
        let newForm = document.createElement('FORM');
        scope.Store = Store;
        if (!scope.data) {
            scope.data = {};
        }
        scope.Store.getList(scope.fieldsResourceName).forEach(function (elementInfo) {
            elementInfo.scope = scope;
            elementInfo.Store = scope.Store;
            let newElement = FormElement.getElement(elementInfo, scope);
            if (newElement) {
                newForm.appendChild(newElement);
                newForm.appendChild(document.createElement("BR"));
            }
        });
        $compile(newForm)(scope);
        scope.eventBus.fireEvent("hideViewRmvBtns");
        scope.eventBus.fireEvent("hideAddBtn");
        scope.eventBus.fireEvent("displayContent", [newForm, false]);
    }
});