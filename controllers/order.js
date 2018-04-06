/**
 * Created by Pavel on 12.09.2017.
 */
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (orderService, config) => {
    const router = express.Router();


    //add
    router.post('/add', (req, res) => {
        res.header('Content-Type', 'application/json');
        orderService.add(req.body)
            .then(() => {
                res.send({success: true});
            })
            .catch((err) => res.error(err));
    });

router.get('/get',(req,res)=>{
    orderService.getAll()
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=> res.error(err));
})

    router.post('/destroy', (req, res) => {
        res.header('Content-Type', 'application/json');
        console.log(req.body.id,req);
        orderService.destroy(req.body.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => res.error(err));
    });

  return router;
}