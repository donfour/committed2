class ChromeStorage {
    constructor(chromeStorage) {
        if (chromeStorage == null) throw new Error('chromeStorage did not get passed into the chromeStorage constructor!')
        this.chromeStorage = chromeStorage
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