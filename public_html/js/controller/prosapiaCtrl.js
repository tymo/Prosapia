angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, List, FormElement, dyTextInput, dyButton) {
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
        $event.preventDefault();
        if (listName && data) {
            List.addItem(listName, data);
        }
        delete scope.data;
    }

    $scope.initLayout = function () {
        let hdiv = document.createElement("DIV");
        let h3 = document.createElement("H3");
        h3.appendChild(document.createTextNode("Dosagens"));
        let fmdiv = document.createElement("DIV");
        fmdiv.setAttribute("class", "jumbotron");
        hdiv.appendChild(h3);
        fmdiv.appendChild(hdiv);
        let tin = dyTextInput.name('name').build();
        fmdiv.appendChild(tin);
        btn = dyButton.listName("dosageList").build();
        fmdiv.appendChild(btn);
        //'<dosage-list event-bus="eventBus", list-name="\'dosageList\'"></dosage-list>'                
        document.getElementById("tabs-2").appendChild(fmdiv);
    }
    $scope.initLayout();
});