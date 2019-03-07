    angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, $compile, List, FormElement, dyForm, dyTextInput, dyButton, dyLListBox) {
    $scope.app = "Prosapia";

//    $scope.medicineInputFields = [
//        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
//        {type: FormElement.SELECT, model: 'dosage', listName: "dosageList", columnList: 'dosage.name', label: 'Selecione a forma de dosagem'},
//        {type: FormElement.BUTTONSUBMIT, listName: "medicineList"}
//    ];

//    $scope.dosageInputFields = [
//        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
//        {type: FormElement.BUTTONSUBMIT, listName: "dosageList"}
//    ];

//    $scope.movementInputFields = [
//        {type: FormElement.SELECT, model: 'medicine', listName: "medicineList", columnList: 'medicine.name, medicine.dosage.name', label: 'Selecione o medicamento'},
//        {type: FormElement.SELECT, model: 'type', listName: "typeList", columnList: 'type.name', label: 'Selecione o tipo de movimentação'},
//        {type: FormElement.TEXTINPUT, name: 'quantity', model: 'quantity', placeHolder: 'Quantidade', eType: 'text'},
//        {type: FormElement.BUTTONSUBMIT, listName: "movementList"}
//    ];
//
//    $scope.typeInputFields = [
//        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
//        {type: FormElement.BUTTONSUBMIT, listName: "typeList"}
//    ];

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

    $scope.addItem = function (listName, data, $event) {
        //$event.preventDefault();
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
        mdcForm.setElementListName("medicineInputFields");
        mdcForm.addElementTo("medicineInputFields", dyTextInput.setModel("name").setName('name').setPlaceHolder("Nome").build());
        mdcForm.addElementTo("medicineInputFields", dyLListBox.setModel("dosage").setListName('dosageList').setColumnList("dosage.name").setLabel("Selecione a forma de dosagem").build());
        mdcForm.addElementTo("medicineInputFields", dyButton.setListName("medicineList").build());
        mdcForm.build();
    }

    $scope.createDosageForm = function () {
        let dosageForm = dyForm.setId("dosageForm").setScope($scope).setListName("'dosageList'");
        dosageForm.setElementListName("dosageInputFields");
        dosageForm.addElementTo("dosageInputFields", dyTextInput.setName("name").setModel("name").setPlaceHolder("Nome").setEType("text").build());
        dosageForm.addElementTo("dosageInputFields", dyButton.setListName("dosageList").build());
        dosageForm.build();
    }

    $scope.createMvtForm = function () {
        let mvtForm = dyForm.setId("movementForm").setScope($scope).setListName("'movementList'");
        mvtForm.setElementListName("movementInputFields");
        mvtForm.addElementTo("movementInputFields", dyLListBox.setModel("medicine").setListName('medicineList').setColumnList("medicine.name, medicine.dosage.name").setLabel("Selecione um medicamento").build());
        mvtForm.addElementTo("movementInputFields", dyLListBox.setModel("type").setListName('typeList').setColumnList("type.name").setLabel("Selecione o tipo e movimentação").build());
        mvtForm.addElementTo("movementInputFields", dyTextInput.setModel("quantity").setName('quantity').setPlaceHolder("Quantidade").build());
        mvtForm.addElementTo("movementInputFields", dyButton.setListName("movementList").build());
        mvtForm.build();
    }

    $scope.createTypeForm = function () {
        let typeForm = dyForm.setId("typeForm").setScope($scope).setListName("'typeList'");
        typeForm.addElementTo("typeInputFields", dyTextInput.setModel("name").setName("name").setPlaceHolder("Nome").build());
        typeForm.addElementTo("typeInputFields", dyButton.setListName("typeList").build());
        typeForm.setElementListName("typeInputFields");
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