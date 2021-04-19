import {DataTypes, Sequelize} from 'sequelize';

import {TodoModelStatic} from '../types/models';

export default (sequelize: Sequelize): TodoModelStatic =>
	sequelize.define(
		'Todo',
		{
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
		},
		{
			tableName: 'todos',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	) as TodoModelStatic;
