/**
 * Created by zach on 2016. 12. 30..
 */
import fs from 'fs'
import request from 'request'


// TODO: journal-frontend 업데이트 되면 pathName 수정하기
const rootURL = 'https://raw.githubusercontent.com/DK-Cigarrette/journal-frontend';
const branch = 'master';
const pathName = 'README.md';

request(`${rootURL}/${branch}/${pathName}`, (err, res, body) => {
    fs.writeFile('src/public/javascript/bundle.js', body, 'utf-8', (error, data) => {
        if(err){
            console.error(err);
        }else{
            console.log(data);
        }
    })
});