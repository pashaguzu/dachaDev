/**
 * Created by Pavel on 01.09.2017.
 */
"use strict"
var Promise = require("bluebird");
const request = require('request');
const config = require('../tsconfig');

module.exports = (serviceRepository,errors) => {

    return {getServices: getServices,getTitle:getTitle};

    function getServices(data)
    {
        return new Promise((resolve, reject) =>
        {
            serviceRepository
                .findAll()
                .then((data) =>
                {
                    if (data == null )
                    {
                        reject(errors.noData);
                        return;
                    }
                    resolve(data);
                })
                .catch(reject);
        })
    }

    function getTitle(id)
    {
        return new Promise((resolve, reject) => {

            serviceRepository
                    .findOne({where: {id: id}, attributes: ['title']})
                    .then((title) => {
                        resolve(title);
                    })
                    .catch(reject);
        })
    }

}