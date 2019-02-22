angular.module("prosapia").directive('movementList', function ($compile, List) {
    return {
        scope: {eventBus: "=", listName: "="},
        link: link,
        template:
                '<div ng-show="hasMovement()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="5">Movimentação</th></tr>\
                <tr class="listHeader">\
                <th class="listHeader">Id</th>\
                <th class="listHeader">Medicamento</th>\
                <th class="listHeader">Tipo</th>\
                <th class="listHeader">Quantidade</th>\
                <th class="listHeader">Excluir</th></tr>\
                <tr class="tr-movement-item" movement-item event-bus="eventBus" movement="movement" \
                ng-repeat="movement in List.getList(listName)"></tr></table>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.List = List;
        scope.hasMovement = function () {
            return (scope.List.getList(scope.listName) != null);
        };        
        $compile(scope.element.contents())(scope);        
    }
    ;
}

);
