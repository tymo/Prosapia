angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, $compile, List, FormElement, dyTextInput, dyButton, dyLListBox) {
    $scope.app = "Prosapia";

    $scope.dosageInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, listName: "dosageList"}
    ];

    $scope.medicineInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.SELECT, model: 'dosage', listName: "dosageList", columnList: 'dosage.name', label: 'Selecione a forma de dosagem'},
        {type: FormElement.BUTTONSUBMIT, listName: "medicineList"}
    ];

    $scope.typeInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, listName: "typeList"}
    ];

    $scope.movementInputFields = [
        {type: FormElement.SELECT, model: 'medicine', listName: "medicineList", columnList: 'medicine.name, medicine.dosage.name', label: 'Selecione o medicamento'},
        {type: FormElement.SELECT, model: 'type', listName: "typeList", columnList: 'type.name', label: 'Selecione o tipo de movimentação'},
        {type: FormElement.TEXTINPUT, name: 'quantity', model: 'quantity', placeHolder: 'Quantidade', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, listName: "movementList"}
    ];

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

    $scope.createMdcDiv = function () {
        let mdcDiv = document.createElement("DIV");
        mdcDiv.appendChild(document.createElement("BR"));
        mdcDiv.appendChild(dyTextInput.model("name").name('name').placeHolder("Nome").build());
        mdcDiv.appendChild(document.createElement("BR"));
        mdcDiv.appendChild(dyLListBox.model("dosage").listName('dosageList').columnList("dosage.name").label("Selecione a forma de dosagem").build());
        mdcDiv.appendChild(document.createElement("BR"));
        mdcDiv.appendChild(dyButton.listName("medicineList").build());
        document.getElementById("mdcDiv").appendChild(mdcDiv);
        $compile(mdcDiv)($scope);
    }

    $scope.createMtvDiv = function () {
        let mtvDiv = document.createElement("DIV");
        mtvDiv.appendChild(document.createElement("BR"));
        mtvDiv.appendChild(dyLListBox.model("medicine").listName('medicineList').columnList("medicine.name, medicine.dosage.name").label("Selecione um medicamento").build());
        mtvDiv.appendChild(document.createElement("BR"));
        mtvDiv.appendChild(dyLListBox.model("type").listName('typeList').columnList("type.name").label("Selecione o tipo e movimentação").build());
        mtvDiv.appendChild(document.createElement("BR"));
        mtvDiv.appendChild(dyTextInput.model("quantity").name('quantity').placeHolder("Quantidade").build());
        mtvDiv.appendChild(document.createElement("BR"));
        mtvDiv.appendChild(dyButton.listName("movementList").build());
        document.getElementById("mtvDiv").appendChild(mtvDiv);
        $compile(mtvDiv)($scope);
    }

    $scope.createTypeDiv = function () {
        let typeDiv = document.createElement("DIV");
        typeDiv.appendChild(document.createElement("BR"));
        typeDiv.appendChild(dyTextInput.model("name").name('name').placeHolder("Nome").build());
        typeDiv.appendChild(dyButton.listName("typeList").build());
        document.getElementById("typeDiv").appendChild(typeDiv);
        $compile(typeDiv)($scope);
    }

    $scope.createDosageDiv = function () {
        let dosageDiv = document.createElement("DIV");
        dosageDiv.appendChild(document.createElement("BR"));
        dosageDiv.appendChild(dyTextInput.model("name").name('name').placeHolder("Nome").build());
        dosageDiv.appendChild(dyButton.listName("dosageList").build());
        document.getElementById("dsgDiv").appendChild(dosageDiv);
//        document.getElementById("dsgDiv").insertBefore(dosageDiv, document.getElementById("dsgDiv").lastChild);
//        document.getElementsByTagName("dosage-list")[0].insertAdjacentElement("beforebegin", dosageDiv);        
        $compile(dosageDiv)($scope);
    }

    $scope.addInputs = function () {        
        $scope.createMdcDiv();
        $scope.createDosageDiv();
        $scope.createMtvDiv();
        $scope.createTypeDiv();
    }
    
    $scope.List = List;
    $scope.addInputs();
});