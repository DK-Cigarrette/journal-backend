import { MongoClient } from 'mongodb'

const updateJournal = (app) => {

    //POST localhost:5000/editJournal?id=587064712736323e86d0a423
    app.post('/editJournal', (req, res, next) => {
        let reqId = req.param('id');
        let ObjectId = require('mongodb').ObjectId;
        let oid = new ObjectId(reqId);

        const dbUrl = process.env.dbAuth || "";
        MongoClient.connect(dbUrl, (err, db) => {
            if(err) throw new Error(err);
            let col = db.collection('testGram');
            col.find({_id:oid}).toArray(function(error, data) {
                if (err) throw error;
                console.log(data);
                res.send(data);
            });
            db.close();
        });
    });
};

export default updateJournal;