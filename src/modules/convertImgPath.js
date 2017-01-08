/**
 * Created by zach on 2017. 1. 8..
 */
import os from 'os'

const convertImgPath = (path) => {
    let interfaces = os.networkInterfaces();
    let addresses = [];
    for (let k in interfaces) {
        for (let k2 in interfaces[k]) {
            let address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    let n = path.slice(path.indexOf('/uploads') + 1);
    let result = n.slice(n.indexOf('/'));

    return `http://${addresses[0]}:${process.env.PORT}/${n}`;
};

export default convertImgPath