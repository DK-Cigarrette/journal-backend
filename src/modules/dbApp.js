/**
 * Created by zach on 2017. 1. 7..
 */
import mongodb, { MongoClient } from 'mongodb'
import EventEmitter from 'events'
const evtNames = {
    connect: 'connection',
    error: 'error'
};

class DB extends EventEmitter {
    constructor(dbPath){
        super();
        this.dbPath = dbPath;
        this.mongodb = mongodb;
        console.log(dbPath);
    }

    _connect(collection){
        if(!collection){
            console.error('at least one collection argument should be passed to [connect] method of dbApp');
            return;
        }

        return new Promise((resolve, reject) => {
            MongoClient.connect(this.dbPath, (err, db) => {
                if(err){
                    this.emit(evtNames.error, {type: evtNames.error, detail: err, target: this});
                    reject(new Error(err));
                }
                let col = db.collection(collection);
                this.emit(evtNames.connect, {type: evtNames.connect, detail: col, target: this});
                resolve(col);
            });
        });

    }

    connect(collection){
        this.db = this._connect(collection);
        return this;
    }

    insert(arg){
        let db = this.db;

        return db.then((col) => {
            let writeResult = col.insert(arg);
            console.log(writeResult);

            return this;
        })
    }

    find(arg={}){
        let db = this.db;
        return db.then(this._find(arg));
    }

    _find(arg){
        return (col) => new Promise((resolve, reject) => {
            col.find(arg).toArray((err, doc) => {
                if(err){reject(new Error(err));}
                resolve(doc);
            });
        });
    }

    delete(arg={}, all=false, opt={}){
        let db = this.db;

        return db.then((col) => {
            let method = all ? col.deleteMany : col.deleteOne;
            let result = method.call(col, arg, opt);
            return result;
        }).then(result => {
            console.log('[DB RESULT: DELETE]', result.result);
            return this;
        }).catch(reason => {
            console.error('[DB ERROR: DELETE]', reason);
        });
    }

    update(query, update, opts){
        let db = this.db;
        return db.then((col) => {
            let result = col.update(query, update, opts);
            console.log('[DB RESULT: UPDATE] ', result);
            return this;
        });
    }
}

export default DB;
