import {DataTypes, QueryInterface} from 'sequelize';

const TABLE_NAME = 'todo-lists';

export default {
	up: (queryInterface: QueryInterface) =>
		queryInterface.createTable(TABLE_NAME, {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			hash: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
		}),
	down: (queryInterface: QueryInterface) => queryInterface.dropTable(TABLE_NAME),
};
