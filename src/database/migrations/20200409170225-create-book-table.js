'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('books', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			synopsis: {
				type: Sequelize.STRING,
				allowNull: false
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false
			},
			publisher: {
				type: Sequelize.STRING,
				allowNull: false
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false
			},
			pages: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			image: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('books');
	}
};
