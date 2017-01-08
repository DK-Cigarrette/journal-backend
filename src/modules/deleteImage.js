/**
 * Created by zach on 2017. 1. 8..
 */
import convertImgPath from './convertImgPath'

export default (req, res, next) => {
    try{
        fs.unlink(convertImgPath(imagePath));
        next();
    }catch(e){
        res.sendStatus(500);
    }
}