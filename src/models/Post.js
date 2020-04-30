const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            body: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            tableName: 'posts',
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

module.exports = Post;