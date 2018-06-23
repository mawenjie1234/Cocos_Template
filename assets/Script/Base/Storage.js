export default class Storage{
    static get shared(){
        if(!this._init){
            this._init = new Storage();
        }
        return this._init;
    }

    constructor(){
        this.bufferedValues = {};
    } 

    hasBufferedData(){
        return (key in this.bufferedValues);
    }

    saveBufferedData (key,data) {
        this.bufferedValues[key] = data;
    };

    saveData(key, value){
        if(this.hasBufferedData(key)){
            this.saveBufferedData(key, value);
        }
        cc.sys.localStorage.setItem(key, value);
    }

    loadData (key) {
        if (this.hasBufferedData(key)) {
            return this.getBufferedData(key);
        } else {
            return cc.sys.localStorage.getItem(key);
        }
    }

    saveJSON (key, jsonObj) {
        this.saveData(key,JSON.stringify(jsonObj));
    }

    loadJSON(key) {
        return JSON.parse(this.loadData(key));
    }

    removeData (key) {
        return cc.sys.localStorage.removeItem(key);
    }

    boolValue (key) {
        return this.loadData(key) === 'true';
    }

    saveBool (key, value) {
        this.saveData(key, value ? 'true' : 'false');
    }

    intValue (key, defaultValue) {
        const value = parseInt(this.loadData(key))
        return isNaN(value) ? defaultValue || 0 : value
    }

    setIntValue (key, intValue) {
        const value = intValue || 0;
        this.saveData(key, value);
    }

    getBufferedData (key) {
        return this.bufferedValues[key];
    };

    removeBufferedData (key) {
        delete this.bufferedValues[key];
    }

    flushCachedData (key) {
        this.saveData(key, this.getBufferedData(key));
        this.removeBufferedData(key);
    }

    flushAll () {
        for (var key in this.bufferedValues) {
            this.saveData(key, this.getBufferedData(key));
        }
        this.bufferedValues = {};
    }
}