angular.module("prosapia").directive('medicineInput', function ($compile) {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<form name="medicineForm" >\
        <input class="form-control" type="text" name="name" ng-model="medicine.name" placeHolder="Nome" >\
        <select class="form-control" ng-model="medicine.dosage" ng-options="dosage.name for dosage in dosageList track by dosage.id">\
            <option value="">Selecione a forma de dosagem</option>\
        </select>\
        <button class="addButton" name="sendButton" ng-click="addMovement(medicine)">Adicionar</button>\
        </form>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.setDosageList = function (dosageList) {
            if (!scope.dosageList) {
                scope.dosageList = dosageList;
            }
        }
        scope.addMovement = function (medicine) {
            if (medicine) {
                scope.nameIsBlank = !medicine.name;
                if (!scope.nameIsBlank) {
                    scope.eventBus.fireEvent("insertMovement", angular.copy(medicine));
                    delete scope.medicine;
                }
            }
        }

        scope.dosageList = null;
        scope.eventBus.addListener("setDosageList", scope.setDosageList);
    }
    ;
});