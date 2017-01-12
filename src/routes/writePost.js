
import mongodb from 'mongodb';
import multer from 'multer';
import mkdirp from 'mkdirp';


var database;
var filePath;
var dirname;

function connectDB(req,res,next) {
    var databaseUrl=process.env.dbAuth;
    mongodb.connect(databaseUrl,function(err,db) {
        if(err) throw err;
        console.log('데이터베이스에 연결되었습니다'+databaseUrl);
        database=db;
        var paramCreateAt = req.param("createAt");
        var paramWeather = req.param("weather");
        var paramContent = req.param("content");
        var paramImagePath = filePath;
        var paramUserName = req.param("username");
        var pageType = req.param("pageType");

        if(pageType && pageType == "update") {
            updatePost(database, req);
        } else {
            addPost(database, paramCreateAt, paramWeather, paramContent, paramImagePath, paramUserName, function(err, result) {
                if(err) { throw err; }
                if(result) {
                    console.log(result);
                } else {

                }
            });
        }
    });
}

// app.get('/', middleware1, m2, m3);
//
// get(function(req){
//     m1(function(req,res){
//         m2
//     })
// });
//
// app.get('/')
//     .then(middleware1)
//     .then()


function addPost (database, createAt, weather, content, imagePath, username) {
    var posts = database.collection("testGram");
    posts.insertOne({"createAt":createAt,"weather":weather, "content":content, "imagePath": imagePath, "username":username}).then(function (err, result) {
        if(err) {
            //callback(err,null);
            return;
        }
        console.log("게시판 데이터 추가함");
        //callback(null,result);
    });
}

function updatePost (database, req) {
    let reqId = req.param('id');
    let ObjectId = require('mongodb').ObjectId;
    let oid = new ObjectId(reqId);
    let posts = database.collection("testGram");
    posts.updateOne({_id:oid},{"weather":req.param("weather"), "content":req.param("content"), "imagePath": filePath, "username":"111111111"}).then(function (err, result) {
        if(err) {
            //callback(err,null);
            return;
        }
        console.log("게시판 데이터 업데이트 완료");
        //callback(null,result);
    });
}

const makeImagePath = (username) => {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return `${__dirname}/../../uploads/${username}/images/${yyyy}/${mm}/${dd}`;
};

const storage = multer.diskStorage({
    destination(req, file, cb){
        let username = req.body.username;
        dirname = makeImagePath(username);

        // make directory recursively on ENOENT
        mkdirp(dirname, (err) => {
            if(err) throw new Error(err);
            cb(null,dirname);
        });
    },

    filename(req, file, cb){
        let date=`/${Date.now()}.png`;
        filePath=dirname+date;
        cb(null, date);
    }
});

const upload = multer({storage: storage});
const writePost = (app) => {

    app.post('/writePosts', upload.single('imagePath'), function (req, res, next) {
        res.send(req.file);
         connectDB(req,res,next);
    });

};

export default writePost;