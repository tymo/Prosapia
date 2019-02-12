angular.module("prosapia").directive('movementTypeItem', function (List) {
    return {
        scope: {eventBus: "=", movementType: "="},
        link: link,
        template:
       '<td>{{movementType.id}}</td>\\n\
        <td>{{movementType.name}}</td>\
        <td><button class="removeButton" ng-click="removeMovementType(movementType)">X</button></td>'
    };

    function link(scope, element) {
        scope.dosage;
        scope.element = element;              
        scope.removeMovementType = function (movementType) {
            List.removeItem('movementTypeList', movementType);            
        };
    }
});
