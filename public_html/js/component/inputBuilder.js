angular.module("prosapia").directive('inputBuilder', function ($compile, FormElement, List) {
    return {
        scope: {
            eventBus: "=",
            inputFields: "=",
            listName: "="
        },
        link: link,
        template:
                '<form name="newForm">\
        </form>'
    };
    function link(scope, element) {
        
        let formContent = "";
        scope.inputFields.forEach(function (input) {
                formContent += FormElement.getElement(input);
        });

        scope.List = List;
        $(element).find("form").prepend(formContent);
        $compile(element.contents())(scope);

        scope.addItem = function (listName, dataObject) {
            if (listName) {
                List.addItem(listName, dataObject);
            }
            delete scope.data;
        }
    }
});