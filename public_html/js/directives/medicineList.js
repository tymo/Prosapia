angular.module("prosapia").directive('medicineList', function ($compile, List) {
    return {
        scope: {eventBus: "=", listName: "="},
        link: link,
        template:
                '<div ng-show="hasMedicine()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="4">MedicamentosS</th></tr>\
                <tr class="listHeader">\
                <th class="listHeader">Id</th>\
                <th class="listHeader">Nome</th>\
                <th class="listHeader">Dosagem</th>\
                <th class="listHeader">Excluir</th></tr>\
                <tr class="tr-medicine-i.tem" medicine-item event-bus="eventBus" medicine="medicine" \
                ng-repeat="medicine in List.getList(listName)"></tr></table>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.List = List;
        scope.hasMedicine = function () {
            return (scope.List.getList(scope.listName) != null);
        };
//        $compile(scope.element.contents())(scope);
    }
    ;
}

);
