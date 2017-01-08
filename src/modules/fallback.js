/**
 * Created by zach on 2016. 12. 31..
 */
import url from 'url'

export default (template) => {
    return (req, res, next) => {
        let isApiCall = url.parse(req.url).path.indexOf('/api') === 0;
        if((req.method === 'GET'|| req.method === 'HEAD') && req.accepts('html') && !req.accepts('image/*')){
            if(!isApiCall){
                res.render(template);
            }
            next();
        }else{
            next();
        }
    }
};