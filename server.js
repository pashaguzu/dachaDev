/**
 * Created by Pavel on 01.07.2017.
 */
const express =  require("express");
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Mustache = require('mustache');
const config = require('./tsconfig');
const dbcontext = require('./context/db')(Sequelize,config);

const serviceService = require('./service/service')(dbcontext.service);
const orderService = require('./service/order')(dbcontext.basket);
const apiController = require('./controllers/api')(serviceService,orderService,config);
const logger = require('./utils/logger');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api',logger);
app.use('/api',apiController);
dbcontext.sequelize
    .sync()
    .then(() =>
    {
        app.listen(5432, () => console.log('---server is running---'));
    })
    .catch((err) => console.log(err));