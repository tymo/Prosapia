angular.module("prosapia").directive('movementList', function () {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div ng-show="hasMovement()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="7">{{Title}}</th></tr>\
                <tr class="listHeader"><th class="listHeader">Id</th><th class="listHeader">Medicamento</th><th class="listHeader">Dosagem</th><th class="listHeader">Quantidade</th><th class="listHeader">Excluir</th></tr>\
                <tr class="tr-movement-item" movement-Item event-bus="eventBus" movement="movement"\
                 ng-repeat="movement in store.get(\'movementList\')"></tr></table>'
    };
    function link(scope, element) {
        class Store {
            constructor() {
                this.data = {};
                this.listeners = {};
            }
            set(property, value) {
                this.data[property] = value;
                if (this.listeners[property]) {
                    this.listeners[property](value);
                }
            }

            get(property) {
                if (this.data[property]) {
                    return this.data[property];
                }
            }

            subscribe(property, func) {
                this.listeners[property] = func;
            }
        }

        scope.element = element;
        scope.store = new Store();
        scope.insertMovement = function (movement) {
            movement.id = scope.idIndex++;
            if (!scope.store.get('movementList').includes(movement)) {
                scope.store.get('movementList').push(angular.copy(movement));
            }
            delete movement;
        }
        scope.deleteMovement = function (event) {
            if (scope.store.get('movementList').includes(event)) {
                delete scope.store.get('movementList').splice(scope.store.get('movementList').indexOf(event), 1)
                ;
            }
            delete event;
        }
        scope.hasMovement = function () {
            return (scope.store.get('movementList').length > 0);
        };
        scope.getMovementList = function () {
            if (scope.store.get('movementList').length > 0) {
                scope.eventBus.fireMovement("checkForMovements", scope.store.get('movementList'));
            }
        };
        
        scope.store.set("movementList", [
            {id: 1, name: "Agua", dosage: {id: 1, name: "Ml"}}
        ]);
        scope.idIndex = (scope.store.get("movementList").length | 1)+1;
        scope.eventBus.addListener("insertMovement", scope.insertMovement);
        scope.eventBus.addListener("deleteMovement", scope.deleteMovement);
        scope.eventBus.addListener("getMovementList", scope.getMovementList);
    };
}

);
