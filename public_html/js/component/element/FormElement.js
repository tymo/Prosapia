angular.module("prosapia").factory('FormElement', function () {
    return {
        TEXTINPUT: 'TXT',
        DATEINPUT: 'TXD',
        DATEPICKER: 'DTP',
        SELECT: 'SLT',
        BUTTONSUBMIT: 'BTN',

        elements: [
            {type: 'TXT', tag: 'INPUT'},
            {type: 'BTN', tag: 'BUTTON'},
            {type: 'SLT', tag: 'SELECT'},
            {type: 'OPT', tag: 'OPTION'}
        ],
        getElement: function (element) {
            let tag = (this.elements.filter(function (cp) {
                return cp.type === element.type;
            })[0] ? this.elements.filter(function (cp) {
                return cp.type === element.type;
            })[0].tag : null);
            newElement = null;
            if (tag) {
                newElement = document.createElement(tag);
                if (element.name) {
                    newElement.name = element.name;
                }
                if (element.id) {
                    newElement.id = element.id;
                }
                if (element.placeHolder) {
                    newElement.setAttribute('placeHolder', element.placeHolder);
                }
                if (element.click) {
                    newElement.setAttribute("ng-click", element.click);
                }
                if (element.options) {
                    newElement.setAttribute("ng-options", element.options);
                    opt = document.createElement("OPTION");
                    opt.appendChild(document.createTextNode(element.option));
                    opt.setAttribute("value", "");
                    opt.setAttribute("label", element.option);
                    newElement.appendChild(opt);
                }
                if (element.model) {
                    newElement.setAttribute("ng-model", "data." + element.model);
                }
                if (element.eType) {
                    newElement.type = element.eType;
                }
                if (element.type === 'BTN') {
                    newElement.appendChild(document.createTextNode("Adicionar"));
                }

                if (element.class) {
                    newElement.className = element.class;
                }
            } else {
                console.warn("Component type \'" + element.type + "\' is not defined.");
            }
            return newElement;
        }
    }
});