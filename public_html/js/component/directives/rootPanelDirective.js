angular.module("prosapia").directive('rootPanelDirective', function ($compile, Store, dyForm, dyTextInput, dyButton) {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div id="rootPanelDirective" class="panel">\
    <button name="addButton" class="addButton" ng-click="showInput()" ng-show="canShowButtons()"  ng-disabled="isAddButtonEnabled()">Adicionar</button>\
    <button name="addButton" class="addButton" ng-click="eventBus.fireEvent(\'showSelected\')" ng-show="canShowButtons()"  ng-disabled="isViewButtonDisabled()">Ver</button>\
    <button name="addButton" class="addButton" ng-click="removeSelected()" ng-show="canShowButtons()"  ng-disabled="canShowRmvBtn()">Excluir</button>\
    <div id="displayArea">\
    </div>\
    </div>'
    };
    function link(scope, element) {
        const CONTENT = 0;
        const SHOW_BUTTONS = 1;
        const INPUT_NAME = 2;
        const GRID_NAME = 3;
        const CLEAR_SELECTED = 4;
        const LIST_NAME = 0;
        const DATA = 1;
        const MOD_LIST = 2;
        const MOD_ATT_NAME = 3;
        const MOD_ATT_PROP = 4;
        scope.element = element;
        scope.addBtnVisible = false;
        scope.viewBtnEnable = false;
        scope.removeBtnEnable = false;
        scope.currentInput = null;
        scope.lastShownGrid = null;
        scope.element = element;
        scope.selectedCount = 0;
        scope.Store = Store;
        scope.displayContent = function (params) {
            if (document.getElementById("displayArea").childElementCount > 0) {
                document.getElementById("displayArea").removeChild(document.getElementById("displayArea").children[0]);
            }
            document.getElementById("displayArea").appendChild(params[CONTENT]);
            if (params[GRID_NAME]) {
                scope.lastShownGrid = params[GRID_NAME];
            }
            if (params[INPUT_NAME]) {
                scope.currentInput = params[INPUT_NAME];
            }
            if (params[SHOW_BUTTONS] === true) {
                scope.addBtnVisible = params[SHOW_BUTTONS];
                scope.viewBtnEnable = false;
                scope.removeBtnEnable = false;
                scope.eventBus.fireEvent("reviewSelectedItems", scope.lastShownGrid);                
            }
            
            if (params[CLEAR_SELECTED] === "true") {
                scope.eventBus.fireEvent("clearSelectedItems", scope.lastShownGrid);
            }
        };

        scope.addItem = function (params) {
            if (params[MOD_LIST] && params[MOD_ATT_NAME] && params[MOD_ATT_PROP] && params[LIST_NAME] && params[DATA]) {
                Store.addItem(params[LIST_NAME], params[DATA], params[MOD_LIST], params[MOD_ATT_NAME], params[MOD_ATT_PROP]);
            } else if (params[LIST_NAME] && params[DATA]) {
                Store.addItem(params[LIST_NAME], params[DATA]);
            }
            if (scope.lastShownGrid) {
                scope.eventBus.fireEvent(scope.lastShownGrid)
            }
        }

        scope.setSelectedItemCount = function (count) {
            scope.selectedCount = count;
            if (scope.selectedCount === 0) {
                scope.viewBtnEnable = false;
                scope.removeBtnEnable = false;
            } else if (scope.selectedCount === 1) {
                scope.viewBtnEnable = true;
                scope.removeBtnEnable = true;
            } else if (scope.selectedCount > 1) {
                scope.viewBtnEnable = false;
                scope.removeBtnEnable = true;
            }
        }

        scope.incSelectedItemCount = function () {
            scope.selectedCount++;
            if (scope.selectedCount === 1) {
                scope.viewBtnEnable = true;
                scope.removeBtnEnable = true;
            } else if (scope.selectedCount > 1) {
                scope.viewBtnEnable = false;
                scope.removeBtnEnable = true;
            }
        }

        scope.decSelectedItemCount = function (hide) {
            if (hide) {
                scope.selectedCount = 0;
            } else {
                scope.selectedCount--;
            }
            if (scope.selectedCount === 0) {
                scope.viewBtnEnable = false;
                scope.removeBtnEnable = false;
            } else if (scope.selectedCount === 1) {
                scope.viewBtnEnable = true;
            } else {
                scope.viewBtnEnable = false;
                scope.removeBtnEnable = true;
            }
        }

        scope.canShowRmvBtn = function () {
            return !scope.removeBtnEnable;
        }

        scope.isViewButtonDisabled = function () {
            return !scope.viewBtnEnable;
        }

        scope.showAddBtn = function () {
            scope.addBtnVisible = true;
        }

        scope.hideAddBtn = function () {
            scope.addBtnVisible = false;
        }

        scope.canShowButtons = function () {
            return scope.addBtnVisible;
        }

        scope.isAddButtonEnabled = function () {
            if (scope.addBtnVisible) {
                return false;
            } else {
                return true;
            }
        }

        scope.showInput = function () {
            if (scope.currentInput) {
                scope.eventBus.fireEvent(scope.currentInput);
            }
        }

        scope.removeSelected = function () {
            scope.eventBus.fireEvent("decSelectedItemCount", true);
            scope.eventBus.fireEvent("removeSelected", scope.lastShownGrid);
            if (scope.lastShownGrid) {
                scope.eventBus.fireEvent(scope.lastShownGrid);
            }
        }

        scope.eventBus.addListener("addItem", scope.addItem);
        scope.eventBus.addListener("displayContent", scope.displayContent);
        scope.eventBus.addListener("setSelectedItemCount", scope.setSelectedItemCount);
        scope.eventBus.addListener("incSelectedItemCount", scope.incSelectedItemCount);
        scope.eventBus.addListener("decSelectedItemCount", scope.decSelectedItemCount);
        scope.eventBus.addListener("showAddBtn", scope.showAddBtn);
        scope.eventBus.addListener("hideAddBtn", scope.hideAddBtn);
    }
    ;
}
);