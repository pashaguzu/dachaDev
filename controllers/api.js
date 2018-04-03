/**
 * Created by Pavel on 24.08.2017.
 */
const express = require('express');
module.exports = (userService,serviceService,orderService,config)=>{
    const router = express.Router();
    const userController = require('./user')(userService,config);
    const serviceController = require('./service')(serviceService,config);
    const orderController = require('./order')(orderService,config);

    router.use('/user',userController);
    router.use('/service',serviceController);
    router.use('/order',orderController);
    return router;
}