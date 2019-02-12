angular.module("prosapia", []);
angular.module("prosapia").controller("prosapiaCtrl", function ($scope) {
    $scope.app = "Prosapia";

    $scope.dosageInputFields = [
        {type: 'TXT', name: 'name', model: 'data.name', placeholder: 'Nome'},
        {type: 'BTN', listName: 'dosageList', dataObject: 'data'}
    ];

    $scope.medicineInputFields = [
        {type: 'TXT', name: 'name', model: 'data.name', placeholder: 'Nome'},
        {type: 'SLT', model: 'data.dosage', options: 'dosage.name for dosage in List.getList(\'dosageList\') track by dosage.id', option: 'Selecione a forma de dosagem'},
        {type: 'BTN', listName: 'medicineList', dataObject: 'data'}
    ];

    $scope.movementTypeInputFields = [
        {type: 'TXT', name: 'name', model: 'data.name', placeholder: 'Nome'},
        {type: 'BTN', listName: 'movementTypeList', dataObject: 'data'}
    ];

    $scope.movementInputFields = [        
        {type: 'SLT', model: 'data.medicine', options: 'medicine.desc for medicine in List.getList(\'medicineList\') track by medicine.id', option: 'Selecione um medicamento'},
        {type: 'TXT', name: 'quantidade', model: 'data.quantity', placeholder: 'Quantidade'},
        {type: 'SLT', model: 'data.type', options: 'type.name for type in List.getList(\'movementTypeList\') track by type.id', option: 'Selecione o tipo de movimentaçaõ'},
        {type: 'BTN', listName: 'movementList', dataObject: 'data'}
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