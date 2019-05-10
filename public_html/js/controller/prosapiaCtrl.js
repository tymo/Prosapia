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
        mdcForm.addElement(dyTextInput.setModel("name").setName('name').setEventBus("eventBus").setPlaceHolder("Nome").setEType("text").setRequired(true).build());
        mdcForm.addElement(dyListBox.setModel("dosage").setEventBus("eventBus").setListName('dosageList').setColumnList("dosage.name").setTrackBy("id").setLabel("Selecione a forma de dosagem").setRequired(true).build());
        mdcForm.addElement(dyButton.setClick('addItem("medicineList", data)').build());
        mdcForm.addElement(dyButtonCancel.setClick('cancelOperation("createDyMdcList")').build());
        mdcForm.setReturnTo("createDyMdcList");
        mdcForm.build();
    }

    $scope.createDsgForm = function () {
        let dosageForm = dyForm.setName("dosageForm").setScope($scope).setListName("'dosageList'");
        dosageForm.setEventBus("eventBus");
        dosageForm.setFieldsResourceName("dosageInputFields");
        dosageForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        dosageForm.addElement(dyTextInput.setName("name").setModel("name").setEventBus("eventBus").setPlaceHolder("Nome").setRequired(true).setEType("text").build());
        dosageForm.addElement(dyButton.setClick('addItem("dosageList", data)').build());
        dosageForm.addElement(dyButtonCancel.setClick('cancelOperation("createDyDsgList")').build());
        dosageForm.setReturnTo("createDyDsgList");
        dosageForm.build();
    };

    $scope.createMvtForm = function () {//      
        let mvtForm = dyForm.setName("movementForm").setScope($scope).setListName("'movementList'");
        mvtForm.setEventBus("eventBus");
        mvtForm.setFieldsResourceName("movementInputFields");
        mvtForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        mvtForm.addElement(dyListBox.setModel("medicine").setListName('medicineList').setColumnList("medicine.name").setTrackBy("id").setLabel("Selecione um medicamento").build());
        mvtForm.addElement(dyListBox.setModel("type").setListName('typeList').setColumnList("type.name").setTrackBy("name").setLabel("Selecione o tipo e movimentação").build());
        mvtForm.addElement(dyTextInput.setModel("quantity").setName('quantity').setPlaceHolder("Quantidade").setRequired(true).setEventBus("eventBus").setEType("text").build());
        mvtForm.addElement(dyButton.setClick('addItem("movementList", data, "medicineList", "medicine", "quantity")').build());
        mvtForm.addElement(dyButtonCancel.setClick('cancelOperation("createDyMvtList")').build());
        mvtForm.setReturnTo("createDyMvtList");
        mvtForm.build();
    }

    $scope.createTypForm = function () {
        let typeForm = dyForm.setName("typeForm").setScope($scope).setListName("'typeList'");
        typeForm.setEventBus("eventBus");
        typeForm.setFieldsResourceName("typeInputFields");
        typeForm.addElement(dyTextInput.setName("id").setModel("id").setPlaceHolder("Id").setEType("text").setDisabled(true).build());
        typeForm.addElement(dyTextInput.setModel("name").setScope($scope).setName("name").setPlaceHolder("Nome").setRequired(true).setEventBus("eventBus").build());
        typeForm.addElement(dyButton.setClick('addItem("typeList", data)').build());
        typeForm.addElement(dyButtonCancel.setClick('cancelOperation("createDyTypList")').build());
        typeForm.setReturnTo("createDyTypList");
        typeForm.build();
    }

    $scope.createDyMdcList = function (clearSelection) {
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
        g.addModel("dosageList.dosage.name");
        g.addColumn("Quantidade");
        g.addModel("quantity");
        g.setAddForm("createMdcForm");
        if (clearSelection) {
            g.setClearSelection(clearSelection);
        }
        g.build();
    }

    $scope.createDyDsgList = function (clearSelection) {
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
        if (clearSelection) {
            g.setClearSelection(clearSelection);
        }
        g.build();
    }

    $scope.createDyMvtList = function (clearSelection) {
        let g = dyGrid.setEventBus($scope.eventBus).setScope($scope).setTableHeader("Movimentação");
        g.setGridBuilder("createDyMvtList");
        g.setListName("movementList");
        g.setColumnListName("movementColumns");
        g.setModelListName("movementModels");
        g.addColumn("Id");
        g.addModel("id");
        g.addColumn("Medicamento");
        g.addModel("medicineList.medicine.name");
        g.addColumn("Tipo");
        g.addModel("typeList.type.name");
        g.addColumn("Quantidade");
        g.addModel("quantity");
        g.setAddForm("createMvtForm");
        if (clearSelection) {
            g.setClearSelection(clearSelection);
        }
        g.build();
    }

    $scope.createDyTypList = function (clearSelection) {
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
        if (clearSelection) {
            g.setClearSelection(clearSelection);
        }
        g.build();
    }

    $scope.addData = function () {
        $scope.Store.addItem("dosageList", {name: "Mg"});
        $scope.Store.addItem("dosageList", {name: "Ml"});
        $scope.Store.addItem("dosageList", {name: "Unidade"});
//        let dosage = {id: 2, name: "Ml"};
//        let dosagel = {id: 3, name: "Unidade"};
//        let nfo = "Agua(" + dosage.name + ")";
        $scope.Store.addItem("medicineList", {name: "Agua", dosage: 2, quantity: 0});
        $scope.Store.addItem("medicineList", {name: "Limão", dosage: 3, quantity: 0});
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