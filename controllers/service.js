/**
 * Created by Pavel on 01.09.2017.
 */
const express = require('express');


module.exports = (serviceService, config) => {
    const router = express.Router();

    //getService
    router.get('/get', (req, res) => {
        serviceService.getServices()
            .then((data) => {

                res.send(data);
            })
            .catch((err) => res.error(err));
    });

    router.get('/title/:id', (req, res) => {
        serviceService.getTitle(req.params.id)
            .then((title) => {
                res.send(title);
            })
            .catch((err) => res.error(err));
    });

    return router;
}