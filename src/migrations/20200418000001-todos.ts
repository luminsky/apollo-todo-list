import {DataTypes, QueryInterface} from 'sequelize';

const TABLE_NAME = 'todos';

export default {
	up: (queryInterface: QueryInterface) =>
		queryInterface.createTable(TABLE_NAME, {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			todo_list_id: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'todo-lists',
					key: 'id',
				},
				onDelete: 'cascade',
				onUpdate: 'cascade',
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			marked: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		}),
	down: (queryInterface: QueryInterface) => queryInterface.dropTable(TABLE_NAME),
};
