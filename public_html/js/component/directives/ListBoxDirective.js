angular.module("prosapia").directive('listBoxDirective', function ($compile, Store) {
    return {
        scope: {
            listName: "@",
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
                    return scope.data[scope.ngModel];
                },
                clearSelection: function () {
                    delete scope.data;
                }};
        }

        scope.selectItem = function (listBox, item) {
            if (listBox) {
                for (var i = 0, j = listBox.options.length; i < j; ++i) {
                    if (listBox.options[i].innerHTML === item) {
                        listBox.selectedIndex = i;
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
                Store.set("validateFormInput");
            });
        }
        if (!scope.data) {
            scope.data = {};
        }
        if (scope.Store.getValue(scope.ngModel)) {
            scope.data[scope.ngModel] = angular.copy(scope.Store.getValue(scope.ngModel));
//            scope.data.dosage.name = angular.copy(scope.Store.getValue(scope.ngModel));
//            scope.data.dosage.id = 3;
            scope.Store.setValue(scope.ngModel, null);
        }
        $compile(newListBox)(scope);
        element.append(newListBox);
    }

});