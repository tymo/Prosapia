angular.module("prosapia").directive('medicineList', function () {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div ng-show="hasMedicine()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="7">{{Title}}</th></tr>\
                <tr class="listHeader"><th class="listHeader">Id</th><th class="listHeader">Nome</th><th class="listHeader">Dosagem</th><th class="listHeader">Excluir</th></tr>\
                <tr class="tr-medicine-item" medicine-Item event-bus="eventBus" medicine="medicine"\
                 ng-repeat="medicine in store.get(\'medicineList\')"></tr></table>'
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
        scope.insertMedicine = function (medicine) {
            medicine.id = scope.idIndex++;
            if (!scope.store.get('medicineList').includes(medicine)) {
                scope.store.get('medicineList').push(angular.copy(medicine));
            }
            delete medicine;
        }
        scope.deleteMedicine = function (event) {
            if (scope.store.get('medicineList').includes(event)) {
                delete scope.store.get('medicineList').splice(scope.store.get('medicineList').indexOf(event), 1)
                ;
            }
            delete event;
        }
        scope.hasMedicine = function () {
            return (scope.store.get('medicineList').length > 0);
        };
        scope.getMedicineList = function () {
            if (scope.store.get('medicineList').length > 0) {
                scope.eventBus.fireMedicine("checkForMedicines", scope.store.get('medicineList'));
            }
        };
        
        scope.store.set("medicineList", [
            {id: 1, name: "Agua", dosage: {id: 1, name: "Ml"}}
        ]);
        scope.idIndex = (scope.store.get("medicineList").length | 1)+1;
        scope.eventBus.addListener("insertMedicine", scope.insertMedicine);
        scope.eventBus.addListener("deleteMedicine", scope.deleteMedicine);
        scope.eventBus.addListener("getMedicineList", scope.getMedicineList);
    };
}

);
