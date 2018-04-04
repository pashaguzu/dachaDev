/**
 * Created by Pavel on 01.09.2017.
 */
"use strict"
var Promise = require("bluebird");
const request = require('request');
const config = require('../tsconfig');

module.exports = (serviceRepository,errors) => {

    return {add:add,destroy:destroy,getServices: getServices};

    function add(data) {
        return new Promise((resolve, reject) => {
                    var item =
                    {
                        title: data.title,
                        describe: data.describe,
                        photo: data.photo
                    };
                    Promise.all([serviceRepository.create(item)])
                        .then(() => resolve({success: true}))
                        .catch(reject);

        })
    }



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

    function destroy(id)
    {
        return new Promise((resolve, reject) => {

            serviceRepository
                    .destroy({where: {id: id}})
                    .then(() => {
                        resolve({success: true});
                    })
                    .catch(reject);
        })
    }

}