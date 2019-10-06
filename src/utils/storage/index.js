import LocalStorage from './local-storage';
import ChromeStorage from './chrome-storage';

/* global chrome */

class StorageFactory {
    static getStorage(storage) {
        switch (storage) {
            case 'local':
                if (!this.localStorage) this.localStorage = new LocalStorage(localStorage);
                return this.localStorage;
            case 'chrome':
                if (!this.chromeStorage) this.chromeStorage = new ChromeStorage(chrome.storage);
                return this.chromeStorage;
            default:
                throw new Error('storage can only be local or chrome, but got:', storage);
        }
    }
}

export default StorageFactory;