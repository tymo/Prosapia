angular.module("prosapia").directive('dosageList', function (List) {
    return {
        scope: {eventBus: "=", listName: "="},
        link: link,
        template:
                '<div ng-show="hasDosage()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="3">Dosages</th></tr>\
                <tr class="listHeader">\
                <th class="listHeader">Id</th>\
                <th class="listHeader">Nome</th>\
                <th class="listHeader">Excluir</th></tr>\
                <tr class="tr-dosage-item" dosage-Item event-bus="eventBus" dosage="dosage" \
                ng-repeat="dosage in List.getList(listName)"></tr></table>'
    };
    function link(scope, element) {
        scope.listName;
//        class Store {
//            constructor() {
//                this.data = {};
//                this.listeners = {};
//            }
//            set(property, value) {
//                this.data[property] = value;
//                if (this.listeners[property]) {
//                    this.listeners[property](value);
//                }
//            }
//
//            get(property) {
//                if (this.data[property]) {
//                    return this.data[property];
//                }
//            }
//
//            subscribe(property, func) {
//                this.listeners[property] = func;
//            }
//        }

        scope.element = element;
//        scope.store = new Store();
//        scope.insertDosage = function (dosage) {
//            dosage.id = scope.idIndex++;
//            if (!scope.store.get('dosageList').includes(dosage)) {
//                scope.store.get('dosageList').push(angular.copy(dosage));
//
//            }
//            delete dosage;
//        }
//        scope.deleteDosage = function (dosage) {
//            if (scope.store.get('dosageList').includes(dosage)) {
//                delete scope.store.get('dosageList').splice(scope.store.get('dosageList').indexOf(dosage), 1)
//                ;
//            }
//            delete dosage;
//        }
        scope.hasDosage = function () {
            return (List.getList(scope.listName)!= null);
        };

//        scope.store.set("dosageList", List.list);
        //scope.idIndex = (scope.store.get("dosageList").length | 0) + 1;
        //scope.eventBus.fireEvent("setDosageList", scope.store.get('dosageList'));
//        scope.eventBus.addListener("insertDosage", scope.insertDosage);
//        scope.eventBus.addListener("deleteDosage", scope.deleteDosage);
    }
    ;
}

);
