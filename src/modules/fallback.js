/**
 * Created by zach on 2016. 12. 31..
 */
export default (template) => {
    return (req, res, next) => {
        if((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')){
            res.render(template);
            next();
        }else{
            next();
        }
    }
};