    angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, $compile, List, FormElement, dyForm, dyTextInput, dyButton, dyLListBox) {
    $scope.app = "Prosapia";
    $scope.listeners = {};
    var listeners = [];
    $scope.eventBus = {
        addListener: function (eventName, method) {
            // add listener on the list of listeners
            let listener = {
                name: eventName,
                callback: method,
            }
            if (!listeners.includes(listener)) {
                listeners.push(listener);
            }
        },
        removeListener(eventName, func) {
            eventMatches = listeners.filter(function (listener) {
                return listener.callback === func;
            });
            eventMatches.forEach(function (evt) {
                delete listeners.splice(listeners.indexOf(evt), 1)
                ;
            });
        },
        fireEvent: function (eventName, param) {
            eventMatches = listeners.filter(function (listener) {
                return listener.name === eventName;
            });
            eventMatches.forEach(function (evt) {
                evt.callback.call(this, param);
            });
        },
    }

    $scope.addItem = function (listName, data) {
        if (listName && data) {
            List.addItem(listName, data);
        }
        delete $scope.data;
    }

    $scope.combine = function (params) {
        let comb = "";
        params.forEach(function (param) {
            if (comb != "") {
                comb += "/";
            }
            comb += param;
        })
        return comb;
    }

    $scope.createMdcForm = function () {
        let mdcForm = dyForm.setId("medicineForm").setScope($scope).setListName("'medicineList'");
        mdcForm.setFieldsResourceName("medicineInputFields");
        mdcForm.addElement(dyTextInput.setModel("name").setName('name').setPlaceHolder("Nome").build());
        mdcForm.addElement(dyLListBox.setModel("dosage").setListName('dosageList').setColumnList("dosage.name").setLabel("Selecione a forma de dosagem").build());
        mdcForm.addElement(dyButton.setListName("medicineList").build());
        mdcForm.build();
    }

    $scope.createDosageForm = function () {
        let dosageForm = dyForm.setId("dosageForm").setScope($scope).setListName("'dosageList'");
        dosageForm.setFieldsResourceName("dosageInputFields");
        dosageForm.addElement(dyTextInput.setName("name").setModel("name").setPlaceHolder("Nome").setEType("text").build());
        dosageForm.addElement(dyButton.setListName("dosageList").build());
        dosageForm.build();
    }

    $scope.createMvtForm = function () {
        let mvtForm = dyForm.setId("movementForm").setScope($scope).setListName("'movementList'");
        mvtForm.setFieldsResourceName("movementInputFields");
        mvtForm.addElement(dyLListBox.setModel("medicine").setListName('medicineList').setColumnList("medicine.name, medicine.dosage.name").setLabel("Selecione um medicamento").build());
        mvtForm.addElement(dyLListBox.setModel("type").setListName('typeList').setColumnList("type.name").setLabel("Selecione o tipo e movimentação").build());
        mvtForm.addElement(dyTextInput.setModel("quantity").setName('quantity').setPlaceHolder("Quantidade").build());
        mvtForm.addElement(dyButton.setListName("movementList").build());
        mvtForm.build();
    }

    $scope.createTypeForm = function () {
        let typeForm = dyForm.setId("typeForm").setScope($scope).setListName("'typeList'");
        typeForm.setFieldsResourceName("typeInputFields");
        typeForm.addElement(dyTextInput.setModel("name").setName("name").setPlaceHolder("Nome").build());
        typeForm.addElement(dyButton.setListName("typeList").build());        
        typeForm.build();
    }

    $scope.createForms = function () {
        $scope.createMdcForm();
        $scope.createDosageForm();
        $scope.createMvtForm();
        $scope.createTypeForm();
    }

    $scope.List = List;
    $scope.createForms();
});