angular.module("prosapia").directive('typeList', function ($compile, List) {
    return {
        scope: {eventBus: "=", listName: "="},
        link: link,
        template:
                '<div ng-show="hasDosage()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="3">Dosagens</th></tr>\
                <tr class="listHeader">\
                <th class="listHeader">Id</th>\
                <th class="listHeader">Nome</th>\
                <th class="listHeader">Excluir</th></tr>\
                <tr class="tr-type-item" type-item event-bus="eventBus" type="type" \
                ng-repeat="type in List.getList(\'typeList\')"></tr></table>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.List = List;
        scope.hasDosage = function () {            
            return (scope.List.getList(scope.listName) != null);
        };
        $compile(scope.element.contents())(scope);
        scope.List.addItem(scope.listName, {name: "Entrada"});
        scope.List.addItem(scope.listName, {name: "Saída"});
    };
}

);
