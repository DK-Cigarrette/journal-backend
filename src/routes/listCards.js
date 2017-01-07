/**
 * Created by zach on 2017. 1. 7..
 */
import dbApp from '../modules/dbApp'
let collection = new dbApp(process.env.dbAuth).connect('testGram');

export default (app) => {
    app.get('/api/getCards', (req, res, next) => {
        console.log(req);
        collection.find({}).then(docs => res.send(docs));
    });
}