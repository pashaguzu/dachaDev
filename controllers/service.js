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
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            })
            .catch((err) => res.error(err));
    });

    router.post('/destroy', (req, res) => {
        res.header('Content-Type', 'application/json');
        serviceService.destroy(req.body.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => res.error(err));
    });

    router.post('/add', (req, res) => {
        res.header('Content-Type', 'application/json');
        serviceService.add(req.body)
            .then((userId) => {
                res.send({success: true});
            })
            .catch((err) => res.error(err));
    });

    return router;
}