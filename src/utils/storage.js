class AbstractStorageService {
    _hasStorage = {
        local: 1,
        session: 1
    };
    _type;
    _proxy;
    constructor(type) {
        if (this._hasStorage[type]) {
            this._proxy = type === 'local' ? localStorage : sessionStorage;
        }

        this._type = type;
    }

    get(key) {
        let value = this._proxy.getItem(key);
        if (value) {
            value = JSON.parse(value);
            if (value.expires) {
                const diff = +new Date() - value.timestamp;
                if (diff > value.expires || diff < 0) {
                    this._proxy.removeItem(key);
                    return null;
                }
            }
            return value.value
        }
        return null;
    }

    set(key, value, expires) {
        if (key) {
            const ret = {
                value: value
            }
            if (expires) {
                ret.expires = expires;
                ret.timestamp = +new Date();
            }
            try {
                this._proxy.setItem(key, JSON.stringify(ret));
            } catch (e) {
                console.error('localstorage set fail.');
            }
        }
    }

    clear() {
        if (this._proxy) this._proxy.clear();
    }
}


class LocalStorageService extends AbstractStorageService {
    constructor() {
        super('local')
    }
}

class SessionStorageService extends AbstractStorageService {
    constructor() {
        super('session')
    }
}

// session = new SessionStorageService();
// local = new LocalStorageService();

export const session = new SessionStorageService();
export const local = new LocalStorageService();