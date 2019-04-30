angular.module("prosapia").directive('buttonDirective', function ($compile, FormElement) {
    return {
        scope: {
            listName: "@",
            modList: "@",
            label: "@",
            type: "@",
            returnTo: "@"
        },
        link: link
    };
    function link(scope, element) {
        let newButton = document.createElement('BUTTON');
        if (scope.type === "SUBMIT") {
            newButton.name = "addButton";
            newButton.type = "submit";
            if (scope.listName) {
                if (scope.modList) {
                    newButton.setAttribute("ng-click", "addItem(\'" + scope.listName + "\', data, \'" + scope.modList + "\')");
                } else {
                    newButton.setAttribute("ng-click", "addItem(\'" + scope.listName + "\', data)");
                }
            }
            if (!scope.label) {
                newButton.appendChild(document.createTextNode("Salvar"));
            }
            newButton.className = "addButton";
        } else if (scope.type === "CANCEL") {
            newButton.name = "buttonCancel";
            if (scope.returnTo) {
                newButton.setAttribute("ng-click", "cancelOperation(\'" + scope.returnTo + "\')");
            }
            if (!scope.label) {
                newButton.appendChild(document.createTextNode("Cancelar"));
            }
            newButton.className = "camcelButton";
        }
        if (scope.label) {
            newButton.appendChild(document.createTextNode(scope.label));
        }
        $compile(newButton)(scope);
        element.append(newButton);
    }
});