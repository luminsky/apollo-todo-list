import {DataTypes, Sequelize} from 'sequelize';

import {TodoListModelStatic} from '../types/models';

export default (sequelize: Sequelize): TodoListModelStatic =>
	sequelize.define(
		'TodoList',
		{
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
		},
		{
			tableName: 'todo-lists',
			timestamps: false,
		},
	) as TodoListModelStatic;
