/**
 * Created by Pavel on 12.09.2017.
 */
"use strict"
const request = require('request');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const config = require('../tsconfig');

module.exports = (orderRepository,errors) => {

    return {add: add, getOrderByID: getOrderByID}
    function add(data, tokenUserId) {
        return new Promise((resolve, reject) => {
            if (tokenUserId) {
                jwt.verify(tokenUserId, config.cookie.key, function (err, decoded) {
                    if (err != null) reject(errors.Unauthorized);
                    var userId = decoded.__user_id;
                    var item =
                    {
                        user_id: userId,
                        service_id: data.service_id,
                        date: data.date,
                        time: data.time,
                        address: data.address,
                        phone: data.phone,
                        status: false
                    };
                    Promise.all([orderRepository.create(item)])
                        .then(() => resolve({success: true}))
                        .catch(reject);
                })
            }
            else {
                reject(errors.Unauthorized)
            }
        })
    }

    function getOrderByID(tokenUserId) {
        return new Promise((resolve, reject)=> {
            if (tokenUserId) {
                jwt.verify(tokenUserId, config.cookie.key, function (err, decoded) {
                    if (err != null) reject(errors.Unauthorized);
                    var userId = decoded.__user_id;
                    orderRepository.findAll({where: {user_id: userId}})
                        .then((data)=> {
                            resolve(data);
                        })
                        .catch(reject);
                })
            }
        })

    }
}
