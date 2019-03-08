angular.module("prosapia").directive('medicineItem', function (List) {
    return {
        scope: {eventBus: "=", medicine: "="},
        link: link,
        template:
                '<td>{{medicine.id}}</td>\
        <td>{{medicine.name}}</td>\
        <td>{{medicine.dosage.name}}</td>\
        <td><button class="removeButton" ng-click="removeMedicine(medicine)">X</button></td>'
    };

    function link(scope, element) {
        scope.element = element;

        scope.removeMedicine = function (medicine) {
            List.removeItem('medicineList', medicine);
        };
    }
});
