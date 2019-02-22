angular.module("prosapia").directive('typeItem', function (List) {
    return {
        scope: {eventBus: "=", type: "="},
        link: link,
        template:
       '<td>{{type.id}}</td>\\n\
        <td>{{type.name}}</td>\
        <td><button class="removeButton" ng-click="removeType(type)">X</button></td>'
    };

    function link(scope, element) {
        scope.type;
        scope.element = element;              
        scope.removeType = function (type) {
            List.removeItem('typeList', type);            
        };
    }
});
