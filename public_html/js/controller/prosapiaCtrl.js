angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope) {
    $scope.app = "Prosapia";

    $scope.dosageInputFields = [
        {type: 'TXT', name: 'name', model: 'data.name', placeholder: 'Nome'},                
        {type: 'BTN', listName: 'dosageList', dataObject: 'data'}
    ];
    
    $scope.medicineInputFields = [
        {type: 'TXT', name: 'name', model: 'data.name', placeholder: 'Nome'},        
        {type: 'SLT', model: 'data.dosage', options: 'dosage.name for dosage in List.getList(listName) track by dosage.id', option: 'Selecione a forma de dosagem'},
        {type: 'BTN', listener: 'insertMedicine', dataObject: 'data'}
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

    $scope.medidaInputFields = [
        {type: 'TXT', name: 'name', model: 'medicine.name', placeholder: 'Nome'},
        {type: 'BTN', listener: 'insertPatient', dataObject: 'medicine'}
    ];

    $scope.movementInputFields = [
        {type: 'TXT', name: 'name', model: 'doctor.name', placeholder: 'Nome'},
        {type: 'BTN', listener: 'insertDoctor', dataObject: 'doctor'}
//        {type: 'BTD'}
    ];

});