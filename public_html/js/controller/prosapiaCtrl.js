angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, FormElement) {
    $scope.app = "Prosapia";

    $scope.dosageInputFields = [
        {type: FormElement.TEXTINPUT, id: 'txbDosage', name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, id: 'btnAddDosage', class: "addButton", click: "addItem(\'dosageList\', data, $event)", data: "data"}
    ];

    $scope.medicineInputFields = [
        {type: FormElement.TEXTINPUT, id: 'txbMedicine', name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.SELECT, id: "cbxDosage", model: 'dosage', options: 'dosage.name for dosage in List.getList(\'dosageList\') track by dosage.id', option: 'Selecione a forma de dosagem', option: "Selecione uma forma de dosagem"},
        {type: FormElement.BUTTONSUBMIT, id: 'btnAddMedicine', class: "addButton", click: "addItem(\'medicineList\', data, $event)", data: "data"}
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

});