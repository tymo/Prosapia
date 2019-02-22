angular.module("prosapia").factory('ListBox', function () {    
    function build(element) {
        const base_query = 'combine([<columnList>]) for <model> in List.getList(\'<listName>\')';
        const base_track = ' track by <model>.<trackBy>';
        newElement = document.createElement('SELECT');
        if (element.model) {
            newElement.setAttribute("ng-model", "data." + element.model);
        }
        if (element.listName) {
            let opts = base_query.replace("<model>", element.model).replace("<listName>", element.listName);            
            opts = opts.replace("<columnList>", element.columnList);
            if(element.tracby) {
                opts += base_track.replace("<model>", element.model).replace("<trackBy>", element.tracby)
            }
            newElement.setAttribute("ng-options", opts);
        }
        if (element.label) {
            let opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(element.label));
            opt.setAttribute("value", "");
            opt.setAttribute("label", element.option);
            newElement.appendChild(opt);
        }
        return newElement;
    }
    return build;
});