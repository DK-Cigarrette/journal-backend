import fs from 'fs'

const packageRouters = (app) => {

    fs.readdirSync(__dirname).forEach( (file) => {
        if(file == 'index.js') return;
        let fileName = file.slice(0, file.indexOf('.'));

        require(`./${fileName}`).default(app);
    } );
};

export default packageRouters;