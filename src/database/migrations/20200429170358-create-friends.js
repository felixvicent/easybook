'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('friends', { 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
      		},
			id_user: {
				type: Sequelize.INTEGER,
				allowNull: false,
      		},
      		id_friend: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		});
	},
	
	down: (queryInterface, Sequelize) => {
		
		return queryInterface.dropTable('friends');
		
	}
};
