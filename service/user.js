/**
 * Created by Pavel on 24.08.2017.
 */
"use strict"
var Promise = require("bluebird");
const request = require('request');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const config = require('../tsconfig');

module.exports = (userRepository,errors) => {

    return {register: register,login:login,getfullname:getfullname};

    function register(data)
    {
        return new Promise((resolve, reject) =>
        {
            if(data.password)
                bcrypt.hash(data.password,saltRounds,function(err,hash){
                    if (err) {
                        throw err;
                    }
                    var user =
                    {
                        email: data.email,
                        password: hash,
                        fullname: data.fullname,
                        telnumber: data.telnumber,
                    };
                    Promise.all([userRepository.create(user)])
                        .then(() => resolve({ success: true }))
                        .catch(reject);
                })
        })
    }
    function login(data)
    {
        return new Promise((resolve, reject) =>
        {
            userRepository
                .findOne({ where: { email: data.email }, attributes: ['id', 'password'] })
                .then((user) =>
                {
                      bcrypt.compare(data.password, user.password, function(err, res) {
                        if(res) resolve([user.id]);
                        else {
                            reject(errors.wrongCredentials);
                        }
                    });
                })
                .catch(reject);
        });
    }

    function getfullname(tokenUserId)
    {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenUserId, config.cookie.key, function (err, decoded) {
                if (err != null) reject(errors.Unauthorized);
                var userId = decoded.__user_id;
                userRepository
                    .findOne({where: {id: userId}, attributes: ['fullname']})
                    .then((fullname) => {
                        resolve(fullname);
                    })
                    .catch(reject);
            });
        })
    }
}