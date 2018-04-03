/**
 * Created by Pavel on 01.09.2017.
 */
module.exports = (Sequelize,sequelize)=>{
    return sequelize.define('service',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        describe:Sequelize.STRING,
        photo:Sequelize.STRING
    })
}