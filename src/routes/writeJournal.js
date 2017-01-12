/**
 * Created by zach on 2016. 12. 31..
 */
import multer from 'multer'
import mkdirp from 'mkdirp'


const storage = multer.diskStorage({
    destination(req, file, cb){
        let username = req.body.username;
        let dirname = `${__dirname}/../../uploads/${username}/images`;

        // make directory recursively on ENOENT
        mkdirp(dirname, (err) => {
            if(err) throw new Error(err);
            cb(null,dirname);
        });
    },

    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
});

const upload = multer({storage: storage});

const writeJournal = (app) => {
    app.post('/write', upload.single('image'), (req, res, next) => {
        res.send(req.file);
    });
};

export default writeJournal;