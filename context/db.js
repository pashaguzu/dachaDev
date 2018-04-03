/**
 * Created by Pavel on 24.08.2017.
 */
const  pg = require('pg');
module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };
    pg.defaults.ssl = true;
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);
    const Service = require('../model/service')(Sequelize, sequelize);
    const Basket = require('../model/order')(Sequelize, sequelize);
    Service.hasOne(Basket,{foreignKey: 'service_id'});
    return {
        sequelize: sequelize,
        service:Service,
        basket:Basket
    };

};