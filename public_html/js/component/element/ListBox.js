angular.module("prosapia").factory('ListBox', function () {

    function build(eInf) {
        newListBox = document.createElement('list-box-directive');
        newListBox.setAttribute("ng-model", eInf.model);
        newListBox.setAttribute("list-name", eInf.listName);
        newListBox.setAttribute("column-list", eInf.columnList);
        if (eInf.trackBy) {
            newListBox.setAttribute("track-by", eInf.trackBy);
        }
        if (eInf.required) {
            newListBox.setAttribute("required", "true");
        }
        newListBox.setAttribute("label", eInf.placeHolder);
        return newListBox;
    }

    return build;
});