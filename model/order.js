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
        name: Sequelize.STRING,
        phone:Sequelize.STRING

    })
}