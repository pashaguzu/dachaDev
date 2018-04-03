/**
 * Created by Pavel on 24.08.2017.
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const tconfig = require('../tsconfig');
module.exports = (authService, config) => {
    const router = express.Router();

    //authorization
    router.post('/login', (req, res) => {
        authService.login(req.body)
            .then((userId) => {

                var token = jwt.sign({ __user_id:userId},tconfig.cookie.key);
                res.cookie('x-access-token',token);
                res.send({success: true});
            })
            .catch((err) => res.error(err));
    });

    //registration
    router.post('/register', (req, res) => {
        res.header('Content-Type', 'application/json');
        authService.register(req.body)
            .then((userId) => {
                res.send({success: true});
            })
            .catch((err) => res.error(err));
    });
    //logout
    router.get('/logout', (req, res) => {
        res.cookie(config.cookie.auth, '');
        res.redirect("/index.html")
    });
    router.get('/fullname', (req, res) => {
        authService.getfullname(req.body)
            .then((name) => {
                res.send(name);
            })
            .catch((err) => res.error(err));
    });

    router.get('/checkauth', (req, res) => {

        if(!req.cookies['x-access-token']||req.cookies['x-access-token']==='')
        {
            res.send('logout');
        }
        if(req.cookies['x-access-token']!=='')
        {
            res.send('login');
        }

        });

    return router;
}