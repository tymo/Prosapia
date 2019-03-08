angular.module("prosapia").directive('movementItem', function (List) {
    return {
        scope: {eventBus: "=", movement: "="},
        link: link,
        template:
                '<td>{{movement.id}}</td>\
        <td>{{movement.medicine.name}}</td>\
        <td>{{movement.type.name}}</td>\
        <td>{{movement.quantity}}</td>\
        <td><button class="removeButton" ng-click="removeMedicine(movement)">X</button></td>'
    };

    function link(scope, element) {
        scope.element = element;

        scope.removeMedicine = function (movement) {
            List.removeItem('movementList', movement);
        };
    }
});
