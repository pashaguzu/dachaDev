/**
 * Created by Pavel on 24.08.2017. */
module.exports = (Sequelize,sequelize)=>{
    return sequelize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,

            validate: {
                isEmail: true
            }
        },
        password: Sequelize.STRING,
        fullname: {
            type: Sequelize.STRING
        },
        telnumber:Sequelize.STRING
    })
}