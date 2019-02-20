angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, FormElement) {
    $scope.app = "Prosapia";

    $scope.dosageInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, class: "addButton", click: "addItem(\'dosageList\', data, $event)"}
    ];

    $scope.medicineInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.SELECT, model: 'dosage', options: 'dosage.name for dosage in List.getList(\'dosageList\') track by dosage.id', option: 'Selecione a forma de dosagem'},
        {type: FormElement.BUTTONSUBMIT, class: "addButton", click: "addItem(\'medicineList\', data, $event)"}
    ];

    $scope.typeInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeHolder: 'Nome', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, class: "addButton", click: "addItem(\'typeList\', data, $event)"}
    ];

    $scope.movementInputFields = [
        {type: FormElement.SELECT, model: 'medicine', options: 'combine([medicine.name, medicine.dosage.name]) for medicine in List.getList(\'medicineList\') track by medicine.id', option: 'Selecione o medicamento'},
        {type: FormElement.SELECT, model: 'type', options: 'type.name for type in List.getList(\'typeList\') track by type.id', option: 'Selecione o tipo de movimentação'},
        {type: FormElement.TEXTINPUT, name: 'quantity', model: 'quantity', placeHolder: 'Quantidade', eType: 'text'},
        {type: FormElement.BUTTONSUBMIT, class: "addButton", click: "addItem(\'movementList\', data, $event)"}
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