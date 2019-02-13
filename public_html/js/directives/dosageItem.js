angular.module("prosapia").directive('dosageItem', function (List) {
    return {
        scope: {eventBus: "=", dosage: "="},
        link: link,
        template:
       '<td>{{dosage.id}}</td>\\n\
        <td>{{dosage.name}}</td>\
        <td><button class="removeButton" ng-click="removeDosage(dosage)">X</button></td>'
    };

    function link(scope, element) {
        scope.dosage;
        scope.element = element;              
        scope.removeDosage = function (dosage) {
            List.removeItem('dosageList', dosage);            
        };
    }
});
