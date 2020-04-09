const { Model, DataTypes } = require('sequelize');

class Book extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            synopsis: DataTypes.STRING,
            author: DataTypes.STRING,
            publisher: DataTypes.STRING,
            category: DataTypes.STRING,
            pages: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            tableName: 'books',
            sequelize
        })
    }
    
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    }
}

module.exports = Book;