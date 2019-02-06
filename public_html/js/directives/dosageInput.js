angular.module("prosapia").directive('dosageInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="dosageForm">\
                <input class="form-control" type="text" ng-model="dosage.name" name="name" placeholder="Nome" />\
                <button class="addButton" name="sendButton" ng-click="addDosage(dosage)">Adicionar</button>\
        </form>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.addDosage = function (dosage) {
            if (dosage) {
                scope.nameIsBlank = !dosage.name;
                if (!scope.nameIsBlank) {
                    scope.eventBus.fireEvent("insertDosage", angular.copy(dosage));
                }                
            } else {
                scope.nameIsBlank = true;
            }
            delete scope.dosage;
        };        
    }
});
