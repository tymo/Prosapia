angular.module("prosapia").directive('dosageItem', function () {
    return {
        scope: {eventBus: "=", dosage: "="},
        link: link,
        template:
       '<td>{{dosage.id}}</td>\\n\
        <td>{{dosage.name}}</td>\
        <td><button class="removeButton" ng-click="removeDosage(dosage)">X</button></td>'
    };

    function link(scope, element) {        
        scope.element = element;              
        scope.removeDosage = function (dosage) {
            scope.eventBus.fireEvent("deleteDosage", dosage);
        };
    }
});
