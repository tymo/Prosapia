angular.module("prosapia").factory('ListBox', function ($compile) {

    function build(elementInfo) {
        const base_query = 'combine([<columnList>]) for <model> in List.getList(\'<listName>\')';
        const base_track = ' track by <model>.<trackBy>';
        newElement = document.createElement('SELECT');
        if (elementInfo.model) {
            newElement.setAttribute("ng-model", "data." + elementInfo.model);
        }
        if (elementInfo.listName) {
            let opts = base_query.replace("<model>", elementInfo.model).replace("<listName>", elementInfo.listName);
            opts = opts.replace("<columnList>", elementInfo.columnList);
            if (elementInfo.trackBy) {
                opts += base_track.replace("<model>", elementInfo.model).replace("<trackBy>", elementInfo.trackBy);
            }
            newElement.setAttribute("ng-options", opts);
        }
        if (elementInfo.label) {
            let opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(elementInfo.label));
            opt.setAttribute("value", "");
            opt.setAttribute("label", elementInfo.label);
            newElement.appendChild(opt);
        }
        return newElement;
    }

//    function build(elementInfo) {
//        newListBox = document.createElement('list-box-directive');
//        newListBox.setAttribute("model", elementInfo.model);
//        newListBox.setAttribute("list-name", elementInfo.listName);
//        newListBox.setAttribute("column-list", elementInfo.columnList);
//        if (elementInfo.trackBy) {
//            newListBox.setAttribute("track-by", elementInfo.trackBy);
//        }
//        newListBox.setAttribute("label", elementInfo.label);
//        return newListBox;
//    }

    return build;
});