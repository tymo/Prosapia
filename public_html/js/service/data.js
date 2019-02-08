angular.module("prosapia").factory('List', function () {
    class Store {
        constructor() {
            this.data = {};
            this.listeners = {};
        }
        set(property, value) {
            this.data[property] = value;
            if (this.listeners[property]) {
                this.listeners[property](value);
            }
        }
        get(property) {
            if (this.data[property]) {
                return this.data[property];
            }
        }
        subscribe(property, func) {
            this.listeners[property] = func;
        }
    }
    return {        
        store : (this.store || new Store()),
        addItem : function (key, item) {
            if (!this.store.get(key)) {
                this.initList(key);
            }
            if (!this.store.get(key).includes(item)) {
                this.store.get(key).push(item);
            }
        },

        removeItem : function (key, item) {
            if (this.store.get(key)) {
                if (this.store.get(key).includes(item)) {
                    delete this.store.get(key).splice(this.store.get(key).indexOf(item), 1)
                    ;
                }
            }
        },

        getList : function(key) {
            if (key && this.store != null) {
                return this.store.get(key);
            }
        },

        initList : function(key) {
            this.store.set(key, []);
        }
    }    
//    l = new List();
//    return list;
});