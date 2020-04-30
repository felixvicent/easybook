const { Model, DataTypes } = require('sequelize');

class Friends extends Model {
    static init(sequelize) {
        super.init({
            id_user: DataTypes.INTEGER,
            id_friend: DataTypes.INTEGER,

        },
        {
            tableName: 'friends',
            sequelize
        })
    }
}

module.exports = Friends;