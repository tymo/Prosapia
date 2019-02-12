angular.module("prosapia").directive('dosageList', function ($compile, List) {
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
                <tr class="tr-dosage-item" dosage-item event-bus="eventBus" dosage="dosage" \
                ng-repeat="dosage in List.getList(\'dosageList\')"></tr></table>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.List = List;
        scope.hasDosage = function () {            
            return (scope.List.getList(scope.listName) != null);
        };
//        $compile(scope.element.contents())(scope);
        scope.List.addItem(scope.listName, {name: "Mg"});
        scope.List.addItem(scope.listName, {name: "Ml"});
        scope.List.addItem(scope.listName, {name: "Caixa(30)"});
        scope.List.addItem(scope.listName, {name: "Caixa(60)"});
        scope.List.addItem(scope.listName, {name: "Cartela(10)"});
        scope.List.addItem(scope.listName, {name: "Cartela(15)"});
        scope.List.addItem(scope.listName, {name: "Unidade"});
    };
}

);
