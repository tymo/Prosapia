angular.module("prosapia").factory('FormElement', function () {
    return {
        TEXTINPUT: 'TXT',
        DATEINPUT: 'TXD',
        DATEPICKER: 'DTP',
        COMBOBOX: 'SLT',
        BUTTONSUBMIT: 'BTN',
        elements: [
            {type: 'TXT', content: '<input type="text" name="<name>" ng-model="data.<model>" placeholder="<placeholder>" class="textInput"/>'},
            {type: 'TXD', content: '<input type="text" ng-model="data.<model>" name="<name>" placeholder="<placeholder>" ui-date/>'},
            {type: 'DTP', content: '<input type="date" name="<name>" ng-model="data.<model>" placeholder="<placeholder>" class="textInput" />'},
            {type: 'BTN', content: '<button class="addButton" name="sendButton" ng-click="addItem(listName, data)">Adicionar</button>'},
            {type: 'SLT', content: '<select class="form-control" ng-model="data.<model>" ng-options="<options>">\
             <option value=""><option></option>\
             </select>'}
        ],
        getElement: function (element) {
            let tplt = (this.elements.filter(function (cp) {
                return cp.type === element.type;
            })[0] ? this.elements.filter(function (cp) {
                return cp.type === element.type;
            })[0].content : null);
            if (tplt) {
                if (element.type === this.BUTTONSUBMIT) {
                    tplt = tplt.replace('<insertListemer>', element.listener).replace('<dataObject>', element.dataObject);
                } else if (element.type === this.COMBOBOX) {
                    tplt = tplt.replace('<model>', element.model).replace('<options>', element.options).replace('<option>', element.option);
                } else if ([this.TEXTINPUT, this.DATEINPUT, this.DATEPICKER].includes(element.type)) {
                    tplt = tplt.replace('<name>', element.name).replace('<model>', element.model).replace('<placeholder>', element.placeholder);
                    tplt += "<br>";
                }
            } else {
                console.warn("Component type \'" + element.type + "\' is not defined.");
            }
            return tplt;
        }
    }
});