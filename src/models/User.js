const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            tellphone: DataTypes.STRING,
            city: DataTypes.STRING,
            uf: DataTypes.STRING,
            bp: DataTypes.INTEGER,
            image: DataTypes.STRING,
        },{
            tableName: 'users',
            sequelize,
            hooks: {
                beforeCreate: user => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
                beforeBulkUpdate: user => {
                    try{
                        const salt = bcrypt.genSaltSync();
                        user.attributes.password = bcrypt.hashSync(user.attributes.password, salt);
                    }
                    catch(err){
                        
                    }
                }
            }
        })
    }

    static associate(models){
        this.hasMany(models.Book, {
            foreignKey: 'user_id',
            as: 'books'
        });
    }
    
    isPassword (encodedPassword, password) {
        return bcrypt.compareSync(password, encodedPassword);
    }
}

module.exports = User;