import http from 'http'
import express from 'express'
import routes from './routes'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import fallback from './modules/fallback'
import cors from 'cors'

const dbUrl = process.env.dbAuth || "";

const port = process.env.PORT||5001;
// get server instance
const app = express();
const server = http.createServer(app);

// view engine setup
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);


//cors
app.use(cors());
// serve static
app.use('/uploads', express.static(`${__dirname}/../uploads`));
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
