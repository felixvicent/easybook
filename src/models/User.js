const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            tellphone: DataTypes.STRING,
            city: DataTypes.STRING,
            uf: DataTypes.STRING,
        },
        {
            tableName: 'users',
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Book, {
            foreignKey: 'user_id',
            as: 'books'
        });
    }
}

module.exports = User;