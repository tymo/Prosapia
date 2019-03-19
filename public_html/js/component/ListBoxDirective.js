angular.module("prosapia").directive('listBoxDirective', function ($compile, List) {
    return {
        scope: {
            model: "@",
            listName: "@",
            columnList: "@",
            trackBy: "@",
            label: "@"
        },
        link: link
    };
    function link(scope, element) {
        scope.handler = function () {
            return {getSelectedItem: function () {
                    return scope.data[scope.model];
                },
                clearSelection: function () {
                    delete scope.data;
                }};
        }
        const base_query = 'combine([<columnList>]) for <model> in List.getList(\'<listName>\')';
        const base_track = ' track by <model>.<trackBy>';
        scope.List = List;
        let newElement = document.createElement('SELECT');
        scope.combine = function (params) {
            let comb = "";
            params.forEach(function (param) {
                if (comb != "") {
                    comb += "/";
                }
                comb += param;
            })
            return comb;
        }
        if (scope.model) {
            newElement.setAttribute("ng-model", "data." + scope.model);
        }
        if (scope.listName) {
            let opts = base_query.replace("<model>", scope.model).replace("<listName>", scope.listName);
            opts = opts.replace("<columnList>", scope.columnList);
            if (scope.trackBy) {
                opts += base_track.replace("<model>", scope.model).replace("<trackBy>", scope.trackBy);
            }
            newElement.setAttribute("ng-options", opts);
        }
        if (scope.label) {
            let opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(scope.label));
            opt.setAttribute("value", "");
            opt.setAttribute("label", scope.label);
            newElement.appendChild(opt);
        }
        $compile(newElement)(scope);
        element.append(newElement);
    }

});