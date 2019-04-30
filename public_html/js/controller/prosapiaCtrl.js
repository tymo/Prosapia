angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, $compile, Store, FormElement, dyForm, dyGrid, dyTextInput, dyButton, dyButtonCancel, dyListBox) {
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

    $scope.createMdcForm = function () {
        let mdcForm = dyForm.setName("medicineForm").setScope($scope).setListName("'medicineList'");
        mdcForm.setEventBus("eventBus");
        mdcForm.setFieldsResourceName("medicineInputFields");
        mdcForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        mdcForm.addElement(dyTextInput.setModel("name").setName('name').setPlaceHolder("Nome").setEType("text").setRequired(true).build());
        mdcForm.addElement(dyListBox.setModel("dosage").setListName('dosageList').setColumnList("dosage.name").setTrackBy("id").setLabel("Selecione a forma de dosagem").build());
        mdcForm.addElement(dyButton.setListName("medicineList").build());
        mdcForm.addElement(dyButtonCancel.setReturnTo("createDyMdcList").build());
        mdcForm.setReturnTo("createDyMdcList");
        mdcForm.build();
    }

    $scope.createDsgForm = function () {
        let dosageForm = dyForm.setName("dosageForm").setScope($scope).setListName("'dosageList'");
        dosageForm.setEventBus("eventBus");
        dosageForm.setFieldsResourceName("dosageInputFields");
        dosageForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        dosageForm.addElement(dyTextInput.setName("name").setModel("name").setPlaceHolder("Nome").setRequired(true).setEType("text").build());
        dosageForm.addElement(dyButton.setListName("dosageList").build());
        dosageForm.addElement(dyButtonCancel.setReturnTo("createDyDsgList").build());
        dosageForm.setReturnTo("createDyDsgList");
        dosageForm.build();
    };

    $scope.createMvtForm = function () {//      
        let mvtForm = dyForm.setName("movementForm").setScope($scope).setListName("'movementList'");
        mvtForm.setEventBus("eventBus");
        mvtForm.setFieldsResourceName("movementInputFields");
        mvtForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        mvtForm.addElement(dyListBox.setModel("medicine").setListName('medicineList').setColumnList("medicine.name, medicine.dosage.name").setTrackBy("name").setLabel("Selecione um medicamento").build());
        mvtForm.addElement(dyListBox.setModel("type").setListName('typeList').setColumnList("type.name").setTrackBy("name").setLabel("Selecione o tipo e movimentação").build());
        mvtForm.addElement(dyTextInput.setModel("quantity").setName('quantity').setPlaceHolder("Quantidade").build());
        mvtForm.addElement(dyButton.setListName("movementList").setModList("medicineList").build());
        mvtForm.addElement(dyButtonCancel.setReturnTo("createDyMvtList").build());
        mvtForm.setReturnTo("createDyMvtList");
        mvtForm.build();
    }

    $scope.createTypForm = function () {
        let typeForm = dyForm.setName("typeForm").setScope($scope).setListName("'typeList'");
        typeForm.setEventBus("eventBus");
        typeForm.setFieldsResourceName("typeInputFields");
        typeForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        typeForm.addElement(dyTextInput.setModel("name").setScope($scope).setName("name").setPlaceHolder("Nome").build());
        typeForm.addElement(dyButton.setListName("typeList").build());
        typeForm.addElement(dyButtonCancel.setReturnTo("createDyTypList").build());
        typeForm.setReturnTo("createDyTypList");
        typeForm.build();
    }

    $scope.createDyMdcList = function () {
        let g = dyGrid.setEventBus($scope.eventBus).setScope($scope).setTableHeader("Medicamentos");
        g.setGridBuilder("createDyMdcList");
        g.setListName("medicineList");
        g.setColumnListName("medicineColumns");
        g.setModelListName("medicineModels");
        g.addColumn("ID");
        g.addModel("id");
        g.addColumn("Nome");
        g.addModel("name");
        g.addColumn("Dosagem");
        g.addModel("dosage.name");
        g.addColumn("Quantidade");
        g.addModel("quantity");
        g.setAddForm("createMdcForm");
        g.build();
    }

    $scope.createDyDsgList = function () {
        let g = dyGrid.setEventBus($scope.eventBus).setScope($scope).setTableHeader("Dosagens");
        g.setGridBuilder("createDyDsgList");
        g.setListName("dosageList");
        g.setColumnListName("dosageColumns");
        g.setModelListName("dosageModels");
        g.addColumn("ID");
        g.addModel("id");
        g.addColumn("Nome");
        g.addModel("name");
        g.setAddForm("createDsgForm");
        g.build();
    }

    $scope.createDyMvtList = function () {
        let g = dyGrid.setEventBus($scope.eventBus).setScope($scope).setTableHeader("Movimentação");
        g.setGridBuilder("createDyMvtList");
        g.setListName("movementList");
        g.setColumnListName("movementColumns");
        g.setModelListName("movementModels");
        g.addColumn("Id");
        g.addModel("id");
        g.addColumn("Medicamento");
        g.addModel("medicine.name");
        g.addColumn("Tipo");
        g.addModel("type.name");
        g.addColumn("Quantidade");
        g.addModel("quantity");
        g.setAddForm("createMvtForm");
        g.build();
    }

    $scope.createDyTypList = function () {
        const newScope = $scope.$new();
        let g = dyGrid.setEventBus($scope.eventBus).setScope(newScope).setTableHeader("Tipo de movimentação");
        g.setGridBuilder("createDyTypList");
        g.setListName("typeList");
        g.setColumnListName("typeColumns");
        g.setModelListName("typeModels");
        g.addColumn("ID");
        g.addModel("id");
        g.addColumn("Nome");
        g.addModel("name");
        g.setAddForm("createTypForm");
        g.build();
    }

    $scope.addData = function () {
        $scope.Store.addItem("dosageList", {name: "Mg"});
        $scope.Store.addItem("dosageList", {name: "Ml"});
        $scope.Store.addItem("dosageList", {name: "Unidade"});
        let dosage = {id: 2, name: "Ml"};
        let dosagel = {id: 3, name: "Unidade"};
        let nfo = "Agua(" + dosage.name + ")";
        $scope.Store.addItem("medicineList", {name: "Agua", dosage: dosage, quantity: 0, info: nfo});
        $scope.Store.addItem("medicineList", {name: "Limão", dosage: dosagel, quantity: 0, info: nfo});
        $scope.Store.addItem("typeList", {name: "Entrada"});
        $scope.Store.addItem("typeList", {name: "Saída"});
    }
    $scope.Store = Store;
    $scope.eventBus.addListener("createDyMdcList", $scope.createDyMdcList);
    $scope.eventBus.addListener("createDyDsgList", $scope.createDyDsgList);
    $scope.eventBus.addListener("createDyMvtList", $scope.createDyMvtList);
    $scope.eventBus.addListener("createDyTypList", $scope.createDyTypList);
    $scope.eventBus.addListener("createMdcList", $scope.createMdcList);
    $scope.eventBus.addListener("createDsgList", $scope.createDsgList);
    $scope.eventBus.addListener("createMvtList", $scope.createMvtList);
    $scope.eventBus.addListener("createTypList", $scope.createTypList);
    $scope.eventBus.addListener("createMdcForm", $scope.createMdcForm);
    $scope.eventBus.addListener("createDsgForm", $scope.createDsgForm);
    $scope.eventBus.addListener("createMvtForm", $scope.createMvtForm);
    $scope.eventBus.addListener("createTypForm", $scope.createTypForm);

    $scope.addData();
});