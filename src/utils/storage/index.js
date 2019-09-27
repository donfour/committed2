import LocalStorage from './local-storage';
import ChromeStorage from './chrome-storage';

class Storage {
    constructor(options){
        //singleton
        if (!!Storage.instance) return Storage.instance;
        Storage.instance = this;

        //actual constructor logic
        if(!options) throw new Error('options is not passed to Storage constructor');

        const { localStorage, chromeStorage } = options;

        if(localStorage) {
            this.storage = new LocalStorage(localStorage);
        } else if(chromeStorage) {
            this.storage = new ChromeStorage(chromeStorage);
        };
    }

    async get(keys){
        return await this.storage.get(...keys);
    }

    async set(obj){
        return await this.storage.set(obj);
    }
}

// { chromeStorage: chrome.storage }

const storage = new Storage(
    { localStorage: localStorage }
);

export default storage;