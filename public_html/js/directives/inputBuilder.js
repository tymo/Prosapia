angular.module("prosapia").directive('inputBuilder', function ($compile, List) {
    return {
        scope: {
            eventBus: "=",            
            inputFields: "=",
            listName: "="            
        },
        link: link,
        template:
                '<form name="newForm">\
        </form>'
    };
    const LISTEER = 0;
    const ITEM = 1;
    function link(scope, element) {
        scope.listName;
        scope.cps = [
            {type: 'TXT', content: '<input type="text" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput"/>'},
            {type: 'TXD', content: '<input type="text" ng-model="<model>" name="<name>" placeholder="<placeholder>" ui-date/>'},
            {type: 'DTP', content: '<input type="date" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput" />'},
            {type: 'BTN', content: '<button class="addButton" name="sendButton" ng-click="List.addItem(\'listName\', <dataObject>)">Adicionar</button>'},
            {type: 'SLT', content: '<select class="form-control" ng-model="<model>" ng-options="<options>">\
             <option value=""><option></option>\
             </select>'}
        ]

        line = "";
        cont = "";
        scope.inputFields.forEach(function (input) {
            line = scope.cps.filter(function (cp) {
                return cp.type === input.type;
            })[0].content;
            if (line) {
                if (input.type === "BTN") {
                    line = line.replace('<insertListemer>', input.listener).replace('<dataObject>', input.dataObject);
                } else if (input.type === "SLT") {
                    line = line.replace('<model>', input.model).replace('<options>', input.options).replace('<option>', input.option);
                } else if (["TXT", "TXD", "DTP"].includes(input.type)) {
                    line = line.replace('<name>', input.name).replace('<model>', input.model).replace('<placeholder>', input.placeholder);
                    line += "<br>";
                }
                cont += line;
            }
        });
        
        $(element).find("form").prepend(cont);
        $compile(element.contents())(scope);

        scope.addItem = function (dataObject) {
            List.addItem(scope.listName, dataObject);
        }

//        scope.setDosageList = function (dosageList) {
//            if (!scope.dosageList) {
//                scope.dosageList = dosageList;
//            }
//        }
//        scope.dosageList = List.list;
//        scope.eventBus.addListener("setDosageList", scope.setDosageList);
    }
});