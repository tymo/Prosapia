angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope, FormElement) {
    $scope.app = "Prosapia";

    $scope.dosageInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeholder: 'Nome'},
        {type: FormElement.BUTTONSUBMIT, listName: 'dosageList'}
    ];

    $scope.medicineInputFields = [
        {type: FormElement.TEXTINPUT, name: 'name', model: 'name', placeholder: 'Nome'},
        {type: FormElement.COMBOBOX, model: 'dosage', options: 'dosage.name for dosage in List.getList(\'dosageList\') track by dosage.id', option: 'Selecione a forma de dosagem'},
        {type: FormElement.BUTTONSUBMIT, listName: 'medicineList'}
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