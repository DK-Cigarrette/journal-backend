/**
 * Created by zach on 2017. 1. 7..
 */
import dbApp from '../modules/dbApp'
import convertImgPath  from '../modules/convertImgPath'
import deleteImage from '../modules/deleteImage'

let collection = new dbApp(process.env.dbAuth).connect('testGram');

const filterInvalidData = function(docs=[]){
    let schema = ['username', 'weather', 'createAt', 'imagePath', 'content', '_id'];
    return docs.filter((each)=>{
        return schema.filter(key => !!each[key]).length === schema.length;
    });
};


export default (app) => {
    app.get('/api/getCards', (req, res, next) => {
        collection.find({}).then((docs) => {
            let d = filterInvalidData(docs).map(each=>{
                let imgSrc = each.imagePath || '';
               return {...each, imagePath: convertImgPath(imgSrc)}
            });

            console.log(d);
            res.send(d);
        });
    });

    app.delete('/api', (req, res, next) => {
        let cardId = req.query._id || '';
        console.log(req.query);
        if(cardId.length > 0){
            collection
                .delete({_id:collection.mongodb.ObjectID(cardId)})
                .then(()=>{
                    res.sendStatus(200);
                })
                .catch(err => res.send(err));
        }else{
            res.sendStatus(500);
        }
    });
}