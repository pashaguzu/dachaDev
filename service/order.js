/**
 * Created by Pavel on 12.09.2017.
 */
"use strict"
const request = require('request');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const config = require('../tsconfig');

module.exports = (orderRepository,errors) => {

    return {add: add, getAll: getAll,destroy:destroy}
    function add(data) {
        return new Promise((resolve, reject) => {
                    var item =
                    {
                        name: data.name,
                        phone: data.phone
                    };
                    Promise.all([orderRepository.create(item)])
                        .then(() => resolve({success: true}))
                        .catch(reject);
        })
    }

    function getAll() {
        return new Promise((resolve, reject)=> {

                    orderRepository.findAndCountAll()
                        .then((data)=> {
                            resolve(data);
                        })
                        .catch(reject);
        })

    }
    function destroy(id)
    {
        return new Promise((resolve, reject) => {

            orderRepository
                .destroy({where: {id: id}})
                .then(() => {
                    resolve({success: true});
                })
                .catch(reject);
        })
    }
}
