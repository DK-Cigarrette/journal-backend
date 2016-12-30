import http from 'http'
import express from 'express'
import routes from './routes'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const port = process.env.PORT || 3000;

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
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// router
app.use(routes);

server.listen(port, ()=>console.log(`Server running on port ${port}`));