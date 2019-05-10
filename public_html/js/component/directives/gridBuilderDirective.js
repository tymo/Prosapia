angular.module("prosapia").directive('gridBuilderDirective', function ($compile, Store) {
    return {
        scope: {
            id: "@",
            eventBus: "=",
            tableHeader: '@',
            columnList: "@",
            modelList: "@",
            listName: "@",
            addForm: "@",
            gridName: "@",
            clearSelection: "@"
        },
        link: link
    };
    function link(scope) {
        const LIST_NAME = 0;
        const OBJ_NAME = 1;
        const PROP_NAME = 2;
        scope.chkChanged = false;
        scope.changeSelection = function (index) {
            scope.chkChanged = true;
            let isChecked = scope.Store.getList(scope.listName)[index].selected;
            if (isChecked) {
                scope.eventBus.fireEvent("incSelectedItemCount");
            } else {
                scope.eventBus.fireEvent("decSelectedItemCount");
            }
        }

        scope.changeRowSelection = function (index) {
            if (!scope.chkChanged) {
                let isChecked = !scope.Store.getList(scope.listName)[index].selected;
                if (isChecked) {
                    scope.eventBus.fireEvent("incSelectedItemCount");
                } else {
                    scope.eventBus.fireEvent("decSelectedItemCount");
                }
                scope.Store.getList(scope.listName)[index].selected = isChecked;
            }
            scope.chkChanged = false;
        }

        let newGrid = document.createElement('TABLE');
        newGrid.className = "tableRoot";
        scope.Store = Store;
        let TR = document.createElement('TR');
        TR.className = "listHeader";

        let TH = document.createElement('TH');
        TH.className = "listHeader";
        TH.appendChild(document.createTextNode(scope.tableHeader));
        TH.setAttribute("colspan", "5");
        TR.appendChild(TH);
        newGrid.appendChild(TR);

        TR = document.createElement('TR');
        TR.className = "listHeader";

        TH = document.createElement('TH');
        TH.className = "listHeader";
        TH.appendChild(document.createTextNode(""));
        TR.appendChild(TH);
        scope.Store.getList(scope.columnList).forEach(function (col) {
            TH = document.createElement('TH');
            TH.className = "listHeader";
            TH.appendChild(document.createTextNode(col));
            TR.appendChild(TH);
        });
        newGrid.appendChild(TR);

        let TD = null;
        let checkBox = null;
        scope.Store.getList(scope.listName).forEach(function (row, idx) {
            let TR = document.createElement('TR');
            TD = document.createElement('TD');
            TD.className = "gridItem";
            checkBox = document.createElement("INPUT");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("ng-model", "Store.getList(listName)[" + idx + "].selected");
            checkBox.setAttribute("ng-change", "changeSelection(" + idx + ")");
            TD.appendChild(checkBox);
            TR.appendChild(TD);
            scope.Store.getList(scope.modelList).forEach(function (model) {
                TD = document.createElement('TD');
                TD.className = "gridItem";
                if (model.includes(".") && row[model.split(".")[OBJ_NAME]]) {
                    let value = scope.Store.getItemPropertyById(model.split(".")[LIST_NAME], row[model.split(".")[OBJ_NAME]], model.split(".")[PROP_NAME]);
                    TD.appendChild(document.createTextNode(value));
                } else {
                    if (!row[model]) {
                        TD.appendChild(document.createTextNode(""));
                    } else {
                        TD.appendChild(document.createTextNode(row[model]));
                    }
                }
                TR.appendChild(TD);
            });
            TR.setAttribute("ng-click", "changeRowSelection(" + idx + ")");
            newGrid.appendChild(TR);
        });
        $compile(newGrid)(scope);
        if (scope.addForm) {
            scope.eventBus.fireEvent("displayContent", [newGrid, true, scope.addForm, scope.gridName, scope.clearSelection]);
        } else {
            scope.eventBus.fireEvent("displayContent", [newGrid, true]);
        }

        scope.showSelected = function () {
            let selectedItem = null;
            scope.Store.getList(scope.listName).filter(function (item) {
                if (item.selected) {
                    selectedItem = item;
                    //item.selected = false;
                }
            });
            if (selectedItem) {
                Object.keys(selectedItem).forEach(function (key) {
//                    if (selectedItem[key] === Object(selectedItem[key])) {
//                        Object.keys(selectedItem[key]).forEach(function (k) {
//                            scope.Store.setValue(key, selectedItem[key][k]);
//                        });
//                    } else {
                    scope.Store.setValue(key, selectedItem[key]);
//                    }
                });
                scope.eventBus.fireEvent(scope.addForm);
            }
        }

        scope.removeSelected = function (gridName) {
            if (scope.gridName === gridName) {
                scope.Store.getList(scope.listName).forEach(function (item) {
                    if (item.selected) {
                        scope.Store.removeItem(scope.listName, item);
                    }
                });
            }
        }

        scope.reviewSelectedItems = function (gridName) {
            let count = 0;
            if (scope.gridName === gridName) {
                scope.Store.getList(scope.listName).forEach(function (item) {
                    if (item.selected) {
                        count++;
                    }
                });
                scope.eventBus.fireEvent("setSelectedItemCount", count);
            }
        }

        scope.clearSelectedItems = function (gridName) {
            if (scope.gridName === gridName) {
                scope.Store.getList(scope.listName).forEach(function (item) {
                    item.selected = false;
                });
            }
            scope.eventBus.fireEvent("setSelectedItemCount", 0);
        }

        scope.eventBus.addListener("showSelected", scope.showSelected);
        scope.eventBus.addListener("removeSelected", scope.removeSelected);
        scope.eventBus.addListener("reviewSelectedItems", scope.reviewSelectedItems);
        scope.eventBus.addListener("clearSelectedItems", scope.clearSelectedItems);
    }
});