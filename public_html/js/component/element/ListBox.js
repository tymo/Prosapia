angular.module("prosapia").factory('ListBox', function ($compile, Store) {

    function build(eInf) {
        newListBox = document.createElement('list-box-directive');
        newListBox.setAttribute("ng-model", eInf.model);
        newListBox.setAttribute("list-name", eInf.listName);
        newListBox.setAttribute("column-list", eInf.columnList);
        if (eInf.trackBy) {
            newListBox.setAttribute("track-by", eInf.trackBy);
        }
        newListBox.setAttribute("label", eInf.label);
//        if (eInf.Store.getValue(eInf.model)) {
//            eInf.scope.data[eInf.model] = angular.copy(eInf.Store.getValue(eInf.model));
//            eInf.Store.setValue(eInf.model, null);
//        }
        return newListBox;
    }

    return build;
});