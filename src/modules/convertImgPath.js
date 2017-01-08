/**
 * Created by zach on 2017. 1. 8..
 */

const convertImgPath = (path) => {
    return path.slice(path.indexOf('/uploads'));
};

export default convertImgPath