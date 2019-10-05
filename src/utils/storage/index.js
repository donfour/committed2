import LocalStorage from './local-storage';
import ChromeStorage from './chrome-storage';

/* global chrome */

class StorageFactory {
    static getStorage(storage) {
        //return existing storage
        if (this.storage) return this.storage;

        //initialize storage
        switch (storage) {
            case 'local':
                this.storage = new LocalStorage(localStorage);
                return this.storage;
            case 'chrome':
                this.storage = new ChromeStorage(chrome.storage);
                return this.storage;
            default:
                throw new Error('storage can only be local or chrome, but got:', storage);
        }
    }
}

const storage = StorageFactory.getStorage('chrome');

export default storage;