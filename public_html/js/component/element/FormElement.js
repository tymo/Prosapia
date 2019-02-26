angular.module("prosapia").factory('FormElement', function (Button, TextInput, ListBox) {
    return {
        TEXTINPUT: TextInput,
        SELECT: ListBox,
        BUTTONSUBMIT: Button,

        getElement: function (elemInfo) {
            newElement = null;
            switch (elemInfo.type) {
                case this.TEXTINPUT:
                {
                    newElement = this.TEXTINPUT(elemInfo);
                    break;
                }
                case this.SELECT:
                {
                    newElement = this.SELECT(elemInfo);
                    break;
                }
                case this.BUTTONSUBMIT:
                {
                    newElement = this.BUTTONSUBMIT(elemInfo);
                    break;
                }
            }
            if (newElement) {
                return newElement;
            } else {
                console.warn("Component type \'" + elemInfo.type + "\' is not defined.");
            }
        }
    }
});