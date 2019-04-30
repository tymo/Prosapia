angular.module("prosapia").directive('rootPanel', function ($compile, Store, dyForm, dyTextInput, dyButton) {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div id="rootPanel" class="panel">\
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
        const LIST_NAME = 0;
        const DATA = 1;
        const MOD_LIST = 2;
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
            if (params[SHOW_BUTTONS] === true) {
                scope.addBtnVisible = params[SHOW_BUTTONS];
            }
            if (params[INPUT_NAME]) {
                scope.currentInput = params[INPUT_NAME];
            }
            if (params[GRID_NAME]) {
                scope.lastShownGrid = params[GRID_NAME];
            }
        };

        scope.addItem = function (params) {
            if (params[MOD_LIST] && params[LIST_NAME] && params[DATA]) {
                Store.addItem(params[LIST_NAME], params[DATA], params[MOD_LIST]);
            } else if (params[LIST_NAME] && params[DATA]) {
                Store.addItem(params[LIST_NAME], params[DATA]);
            }
            if (scope.lastShownGrid) {
                scope.eventBus.fireEvent(scope.lastShownGrid)
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
            scope.eventBus.fireEvent("removeSelected");
            if (scope.lastShownGrid) {
                scope.eventBus.fireEvent(scope.lastShownGrid);
            }
        }

        scope.eventBus.addListener("addItem", scope.addItem);
        scope.eventBus.addListener("displayContent", scope.displayContent);
        scope.eventBus.addListener("incSelectedItemCount", scope.incSelectedItemCount);
        scope.eventBus.addListener("decSelectedItemCount", scope.decSelectedItemCount);
        scope.eventBus.addListener("showAddBtn", scope.showAddBtn);
        scope.eventBus.addListener("hideAddBtn", scope.hideAddBtn);
    }
    ;
}
);