import { MongoClient } from 'mongodb'

const deletePost = (app) => {

    //POST localhost:3000/deletePost?id=5870c184347a8a43ec6b1a37
    app.post('/deletePost', (req, res, next) => {
        let reqId = req.param('id');
        let ObjectId = require('mongodb').ObjectId;
        let oid = new ObjectId(reqId);

        const dbUrl = process.env.dbAuth || "";
        MongoClient.connect(dbUrl, (err, db) => {
            if(err) throw new Error(err);
            let col = db.collection('testGram');

            col.deleteOne({_id:oid});
            console.log("삭제되었습니다");
            res.send({_id:oid});
            db.close();
        });
    });
};

export default deletePost;