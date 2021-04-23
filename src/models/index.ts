import {Sequelize} from 'sequelize';
import databaseConfig from '../config/db.js';

import MTodoList from './todo-list';
import MTodo from './todo';

const ENV = process.env.NODE_ENV as 'development' | 'production';
const config = databaseConfig[ENV] as any;

const sequelize = new Sequelize(config);

const TodoList = MTodoList(sequelize);
const Todo = MTodo(sequelize);

TodoList.hasMany(Todo, {foreignKey: 'todo_list_id', onDelete: 'cascade'});
Todo.belongsTo(TodoList, {foreignKey: 'todo_list_id'});

export {TodoList, Todo};
