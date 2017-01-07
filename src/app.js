import http from 'http'
import express from 'express'
import routes from './routes'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import fallback from './modules/fallback'
import { MongoClient } from 'mongodb'

const dbUrl = process.env.dbAuth || "";
console.log(dbUrl);
MongoClient.connect(dbUrl, (err, db) => {
    if(err) throw new Error(err);
    let col = db.collection('diary');
    // col.find().toArray((err, arr)=>console.log(arr));
    db.close();
});


const port = process.env.PORT || 5000;
// get server instance
const app = express();
const server = http.createServer(app);

// view engine setup
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// serve static
app.use(express.static(`${__dirname}/public`));
// logger
app.use(morgan('combined'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// persists in routing to index.html for GET methods (for client scripts to handle 404 errors)
app.use(fallback('index'));

// router
routes(app);

server.listen(port, () => console.log(`Server running on port ${port}`));
