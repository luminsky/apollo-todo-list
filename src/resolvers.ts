import {AuthenticationError, ForbiddenError, ValidationError} from 'apollo-server';
import argon from 'argon2';
import jwt from 'jsonwebtoken';

import * as errors from './messages/errors';

import {Context} from './types';
import {Todo as ITodo} from './types/models';
import {Todo, TodoList} from './models';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_OPTIONS = {expiresIn: '4h'};

export function verifyToken(token: string | null | undefined) {
	if (!token) {
		throw new ForbiddenError(errors.FORBIDDEN);
	}

	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		throw new ForbiddenError(errors.FORBIDDEN);
	}
}

export function mapTodo(todo: ITodo) {
	return {
		id: todo.id,
		title: todo.title,
		marked: todo.marked,
		created_at: todo.created_at,
		updated_at: todo.updated_at,
	};
}

export const todos = async (_: void, {}, {token}: Context) => {
	let listId;
	try {
		listId = verifyToken(token);
	} catch (error) {
		return error;
	}

	const todos = await Todo.findAll({where: {todo_list_id: listId}});
	return todos.map(mapTodo);
};

export const todo = async (_: void, {id}: {id: string}, {token}: Context) => {
	let listId;
	try {
		listId = verifyToken(token);
	} catch (error) {
		return error;
	}

	const todo = await Todo.findOne({where: {id, todo_list_id: listId}});
	if (!todo) {
		return new ValidationError(errors.TODO_NOT_FOUND);
	}

	return mapTodo(todo);
};

export const createTodoList = async (_: void, {email, password}: {email: string; password: string}) => {
	const existingList = await TodoList.findOne({where: {email}, attributes: ['id']});
	if (existingList) {
		return new ValidationError(errors.EMAIL_ALREADY_EXISTS);
	}

	const hash = await argon.hash(password, {type: argon.argon2id});
	const {id} = await TodoList.create({email, hash});
	return jwt.sign(id, JWT_SECRET, JWT_OPTIONS);
};

export const getAuthToken = async (_: void, {email, password}: {email: string; password: string}) => {
	const todoList = await TodoList.findOne({where: {email}, attributes: ['hash', 'id']});
	if (!todoList) {
		return new AuthenticationError(errors.EMAIL_NOT_EXISTS);
	}

	const isValid = await argon.verify(todoList.hash, password);
	if (!isValid) {
		return new AuthenticationError(errors.WRONG_PASSWORD);
	}
	return jwt.sign(todoList.id, JWT_SECRET, JWT_OPTIONS);
};

export const addTodo = async (_: void, {title}: {title: string}, {token}: Context) => {
	let listId;
	try {
		listId = verifyToken(token);
	} catch (error) {
		return error;
	}

	const createdTodo = await Todo.create({todo_list_id: listId, title, marked: false});
	return mapTodo(createdTodo);
};

export const toggleTodoStatus = async (_: void, {id}: {id: string}, {token}: Context) => {
	let listId;
	try {
		listId = verifyToken(token);
	} catch (error) {
		return error;
	}

	const todo = await Todo.findOne({where: {id, todo_list_id: listId}});

	if (!todo) {
		return new ValidationError(errors.TODO_NOT_FOUND);
	}

	const updatedTodo = await todo.update({marked: !todo.marked});
	return mapTodo(updatedTodo);
};

export const removeTodo = async (_: void, {id}: {id: string}, {token}: Context) => {
	let listId;
	try {
		listId = verifyToken(token);
	} catch (error) {
		return error;
	}

	const todo = await Todo.findOne({where: {id, todo_list_id: listId}});

	if (!todo) {
		return new ValidationError(errors.TODO_NOT_FOUND);
	}

	await todo.destroy();
	return mapTodo(todo);
};
