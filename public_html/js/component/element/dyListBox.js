angular.module("prosapia").factory('dyLListBox', function () {
    this._model = null;
    this._listName = null;
    this._columnList = null;
    this._label = null;
    this._trackBy = null;
    this.newElement = null;

    this.model = function (model) {
        this._model = model;
        return this;
    }
    this.listName = function (listName) {
        this._listName = listName;
        return this;
    }
    this.columnList = function (columnList) {
        this._columnList = columnList;
        return this;
    }
    this.label = function (label) {
        this._label = label;
        return this;
    }
    this.trackBy = function (trackBy) {
        this._trackBy = trackBy;
        return this;
    }

    this.build = function () {
        const base_query = 'combine([<columnList>]) for <model> in List.getList(\'<listName>\')';
        const base_track = ' track by <model>.<trackBy>';
        this.newElement = document.createElement('SELECT');
        if (this._model) {
            this.newElement.setAttribute("ng-model", "data." + this._model);
        }
        if (this._listName) {
            let opts = base_query.replace("<model>", this._model).replace("<listName>", this._listName);
            opts = opts.replace("<columnList>", this._columnList);
            if (this._tracby) {
                opts += base_track.replace("<model>", this._model).replace("<trackBy>", this._tracby)
            }
            this.newElement.setAttribute("ng-options", opts);
        }
        if (this._label) {
            let opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(this._label));
            opt.setAttribute("value", "");
            opt.setAttribute("label", this._label);
            this.newElement.appendChild(opt);
        }
        return this.newElement;
    }

    return this;
});