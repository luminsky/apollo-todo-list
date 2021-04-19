import {BuildOptions, Model} from 'sequelize/types';

export type ModelStatic<T> = typeof Model & {
	new (values?: Partial<T>, options?: BuildOptions): T;
};

export interface TodoList extends Model {
	readonly id: string;
	hash: string;
	email: string;
}

export type TodoListModelStatic = ModelStatic<TodoList>;

export interface Todo extends Model {
	readonly id: string;
	readonly todo_list_id: string;
	title: string;
	marked: boolean;
	readonly created_at: string;
	readonly updated_at: string;
}

export type TodoModelStatic = ModelStatic<Todo>;
