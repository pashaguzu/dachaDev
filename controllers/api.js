/**
 * Created by Pavel on 24.08.2017.
 */
const express = require('express');
module.exports = (serviceService,orderService,config)=>{
    const router = express.Router();
      const serviceController = require('./service')(serviceService,config);
    const orderController = require('./order')(orderService,config);
    router.use('/service',serviceController);
    router.use('/order',orderController);
    return router;
}