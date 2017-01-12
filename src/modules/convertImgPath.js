/**
 * Created by zach on 2017. 1. 8..
 */
import getHostAddr from './getHostAddr'

const convertImgPath = (path) => {
    let n = path.slice(path.indexOf('/uploads') + 1);

    return `http://${getHostAddr()[0]}:${process.env.PORT}/${n}`;
};

export default convertImgPathconvertImgPath