angular.module("prosapia").factory('Store', function () {
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
    const ID = "_ID";
    return {
        store: (this.store || new Store()),
        addItem: function (key, item, modList) {
            if (!this.store.get(key)) {
                this.initList(key);
            }
            if (!item.id) {
                let keyID = key + ID;
                if (!this.store.get(keyID)) {
                    this.store.set(keyID, 1);
                }
                let nextId = this.store.get(keyID);
                item.id = nextId;
                this.store.set(keyID, ++nextId);
                if (!this.store.get(key).includes(item)) {
                    this.store.get(key).push(item);
                }
            } else {
                let idx = this.store.get(key).indexOf(this.store.get(key).filter(function (itm) {
                    return itm.id === item.id;
                })[0]);
                this.store.get(key)[idx] = item;
            }
            if (modList && item) {
                if (this.store.get(modList).includes(item.medicine)) {
                    let indx = this.store.get(modList).indexOf(item.medicine);
                    let qtt = (this.store.get(modList)[indx].quantity || 0);
                    if (item.type.id === 1) {
                        modValue = Math.abs(item.quantity);
                    } else if (item.type.id === 2) {
                        modValue = Math.abs(item.quantity) * -1;
                    }
                    qtt = qtt + modValue;
                    this.store.get(modList)[indx].quantity = qtt;
                }
            }
        },
        removeItem: function (key, item) {
            if (this.store.get(key)) {
                if (this.store.get(key).includes(item)) {
                    delete this.store.get(key).splice(this.store.get(key).indexOf(item), 1)
                    ;
                }
            }
        },
        getList: function (key) {
            if (!this.store.get(key)) {
                this.initList(key);
            }
            return this.store.get(key);
        },
        setList: function (key, list) {
            this.store.set(key, list);
        },
        initList: function (key) {
            this.store.set(key, []);
        },
        subscribe: function (property, func) {
            this.store.subscribe(property, func);
        },
        set: function (property, value) {
            this.store.set(property, value);
        },
        setValue: function (key, value) {
            this.store.set(key, value);
        },
        getValue: function (key) {
            return this.store.get(key);
        }
    }
});