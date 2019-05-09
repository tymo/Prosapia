angular.module("prosapia").directive('listBoxDirective', function ($compile, Store) {
    return {
        scope: {
            listName: "@",
            eventBus: "=",
            columnList: "@",
            trackBy: "@",
            ngModel: "@",
            label: "@",
            required: "@"
        },
        link: link
    };
    function link(scope, element) {
        scope.handler = function () {
            return {getSelectedItem: function () {
                    return scope.data[scope.ngModel]["id"];
//                    return scope.Store.getItemPropertyById(scope.listName, scope.data[scope.ngModel]);
                },
                clearSelection: function () {
                    delete scope.data;
                }};
        }

        scope.selectItem = function (listBox, item) {
            if (listBox) {
                for (var idx = 0, j = listBox.options.length; idx < j; ++idx) {
                    if (listBox.options[idx].innerHTML === item) {
                        listBox.selectedIndex = idx;
                        break;
                    }
                }
            }
        }
        const base_query = 'combine([<columnList>]) for <model> in Store.getList(\'<listName>\')';
        const base_track = ' track by <model>.<trackBy>';
        scope.Store = Store;
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
        scope.validateRequired = function (listBox) {
            if (!listBox.value) {
                scope.eventBus.fireEvent("addError", ["Por facor " + scope.label, true]);
            } else {
                scope.eventBus.fireEvent("refreshErrorList");
            }
        }
        let newListBox = document.createElement('SELECT');
        if (scope.ngModel) {
            newListBox.setAttribute("ng-model", "data." + scope.ngModel);
            newListBox.name = scope.ngModel;
        }
        if (scope.listName) {
            let opts = base_query.replace("<model>", scope.ngModel).replace("<listName>", scope.listName);
            opts = opts.replace("<columnList>", scope.columnList);
            if (scope.trackBy) {
                opts += base_track.replace("<model>", scope.ngModel).replace("<trackBy>", scope.trackBy);
            }
            newListBox.setAttribute("ng-options", opts);
        }
        if (scope.label) {
            let opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(scope.label));
            opt.setAttribute("value", "");
            opt.setAttribute("label", scope.label);
            newListBox.appendChild(opt);
        }
        if (scope.required) {
            newListBox.setAttribute("required", "true");
            newListBox.addEventListener("blur", function () {
                scope.validateRequired(newListBox);
            });
        }
        if (!scope.data) {
            scope.data = {};
        }
        if (scope.Store.getValue(scope.ngModel)) {
            let id = angular.copy(scope.Store.getValue(scope.ngModel));
            scope.data[scope.ngModel] = scope.Store.getItemObjectById(scope.listName, id);
            scope.Store.setValue(scope.ngModel, null);
        }
        $compile(newListBox)(scope);
        element.append(newListBox);
    }
});