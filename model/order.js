/**
 * Created by Pavel on 11.09.2017.
 */
module.exports = (Sequelize,sequelize)=>{
    return sequelize.define('orders',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: Sequelize.INTEGER,
        service_id:Sequelize.INTEGER,
        date:{
            type: Sequelize.DATEONLY
        },
        time: Sequelize.TIME,
        address:Sequelize.STRING,
        phone:Sequelize.STRING,
        status:Sequelize.BOOLEAN

    })
}