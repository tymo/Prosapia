angular.module("prosapia").directive('rootPanel', function ($compile, Store, dyForm, dyTextInput, dyButton) {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div id="rootPanel" class="panel">\
                <button name="addButton" class="addButton"  ng-click="showInput()" ng-show="canShowAddBtn()">Adicionar</button>\
                <button name="addButton" class="addButton"  ng-click="eventBus.fireEvent(\'showSelected\')" ng-show="canShowViewRmvBtns()">Ver</button>\
                <button name="addButton" class="addButton"  ng-click="removeSelected()" ng-show="canShowViewRmvBtns()">Excluir</button>\
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
        scope.addBtnVisible = false;
        scope.viewRmvBtnVisible = false;
        scope.currentInput = null;
        scope.lastShiwnGrid = null;
        scope.element = element;
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
                scope.lastShiwnGrid = params[GRID_NAME];
            }
        };

        scope.addItem = function (params) {
            if (params[MOD_LIST] && params[LIST_NAME] && params[DATA]) {
                Store.addItem(params[LIST_NAME], params[DATA], params[MOD_LIST]);
            } else if (params[LIST_NAME] && params[DATA]) {
                Store.addItem(params[LIST_NAME], params[DATA]);
            }
            if (scope.lastShiwnGrid) {
                scope.eventBus.fireEvent(scope.lastShiwnGrid)
            }
        }

        scope.ShowViewRmvBtns = function () {
            scope.viewRmvBtnVisible = true;
        }

        scope.hideViewRmvBtns = function () {
            scope.viewRmvBtnVisible = false;
        }

        scope.canShowViewRmvBtns = function () {
            return scope.viewRmvBtnVisible;
        }

        scope.showAddBtn = function () {
            scope.addBtnVisible = true;
        }

        scope.hideAddBtn = function () {
            scope.addBtnVisible = false;
        }

        scope.canShowAddBtn = function () {
            return scope.addBtnVisible;
        }

        scope.showInput = function () {
            if (scope.currentInput) {
                scope.eventBus.fireEvent(scope.currentInput);
            }
        }

        scope.removeSelected = function () {
            scope.eventBus.fireEvent("removeSelected");
            if (scope.lastShiwnGrid) {
                scope.eventBus.fireEvent(scope.lastShiwnGrid);
            }
        }

        scope.eventBus.addListener("addItem", scope.addItem);
        scope.eventBus.addListener("displayContent", scope.displayContent);
        scope.eventBus.addListener("ShowViewRmvBtns", scope.ShowViewRmvBtns);
        scope.eventBus.addListener("hideViewRmvBtns", scope.hideViewRmvBtns);
        scope.eventBus.addListener("showAddBtn", scope.showAddBtn);
        scope.eventBus.addListener("hideAddBtn", scope.hideAddBtn);
    }
    ;
}
);