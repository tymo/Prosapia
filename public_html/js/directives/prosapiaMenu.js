angular.module("prosapia").directive('prosapiaMenu', function ($compile, List, dyForm, dyTextInput, dyButton) {
    return {
        scope: {eventBus: "=", listName: "="},
        link: link,
        template:
                '<div>\
                <button class="addButton" ng-click="showMdc()">Medicamentos</button><br>\
                <button class="addButton" ng-click="showDsg()">Dosagens</button>\
                </dic>'
    };
    function link(scope, element) {

        scope.createTypeForm = function () {
            let typeForm = dyForm.setId("typeForm").setScope(scope).setListName("'typeList'");
            typeForm.setFieldsResourceName("typeInputFields");
            typeForm.addElement(dyTextInput.setModel("name").setName("name").setPlaceHolder("Nome").build());
            typeForm.addElement(dyButton.setListName("typeList").build());
            typeForm.build();
            $(scope.element.find("div")).append(typeForm);
        }

        scope.element = element;
        scope.List = List;
        scope.showMdc = function () {

        };
        scope.showDsg = function () {
            scope.createTypeForm();
        };
        $compile(scope.element.contents())(scope);
    }
    ;
}

);
