import EventEmitter from 'events';

class ChromeStorage extends EventEmitter {
    constructor(chromeStorage) {
        super();
        
        if (chromeStorage == null) throw new Error('chromeStorage did not get passed into the chromeStorage constructor!');
        
        this.chromeStorage = chromeStorage;

        chromeStorage.onChanged.addListener(changes => {
            const result = {};
            Object.entries(changes).forEach(([key, {newValue}]) => {
                result[key] = newValue;
            })
            this.emit('save', result);
        })
    }

    get = (...keys) => {
        return keys && new Promise((resolve) => {
            this.chromeStorage.sync.get(keys, function (result) {
                resolve(result);
            });
        })
    }

    set = (obj) => {
        obj && new Promise((resolve) => {
            this.chromeStorage.sync.set(obj, function () {
                resolve('Value saved!');
            });
        })
    }
}

export default ChromeStorage;