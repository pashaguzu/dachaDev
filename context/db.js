/**
 * Created by Pavel on 24.08.2017.
 */
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
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);
    const User = require('../model/user')(Sequelize, sequelize);
    const Service = require('../model/service')(Sequelize, sequelize);
    const Basket = require('../model/order')(Sequelize, sequelize);
    User.hasOne(Basket,{foreignKey: 'user_id'});
    Service.hasOne(Basket,{foreignKey: 'service_id'});
    return {
        sequelize: sequelize,
        user:User,
        service:Service,
        basket:Basket
    };

};