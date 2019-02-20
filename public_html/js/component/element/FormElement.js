angular.module("prosapia").factory('FormElement', function (Button, TextInput, ListBox) {
    return {
        TEXTINPUT: 'TXT',
        DATEINPUT: 'TXD',
        DATEPICKER: 'DTP',
        SELECT: 'SLT',
        BUTTONSUBMIT: 'BTN',

        elements: [
            {type: 'TXT', cmp: TextInput},
            {type: 'BTN', cmp: Button},
            {type: 'SLT', cmp: ListBox}
        ],

        getElement: function (elemInfo) {
            let element = (this.elements.filter(function (cp) {
                return cp.type === elemInfo.type;
            })[0] ? this.elements.filter(function (cp) {
                return cp.type === elemInfo.type;
            })[0].cmp : null);
            newElement = null;
            if (element) {
                newElement = element(elemInfo);
            } else {
                console.warn("Component type \'" + elemInfo.type + "\' is not defined.");
            }
            return newElement;
        }
    }
});