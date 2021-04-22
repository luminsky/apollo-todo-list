import {ApolloServer, gql} from 'apollo-server-lambda';
import {addTodo, createTodoList, getAuthToken, todo, todos, toggleTodoStatus, removeTodo} from './resolvers';

const typeDefs = gql`
	type Todo {
		id: ID!
		title: String!
		marked: Boolean!
		created_at: String!
		updated_at: String
	}

	type Query {
		todos: [Todo]
		todo(id: ID!): Todo
	}

	type Mutation {
		createTodoList(email: String, password: String): String
		getAuthToken(email: String, password: String): String
		addTodo(title: String): Todo
		toggleTodoStatus(id: ID!): Todo
		removeTodo(id: ID!): Todo
	}
`;

const resolvers = {
	Query: {
		todos,
		todo,
	},
	Mutation: {
		createTodoList,
		getAuthToken,
		addTodo,
		toggleTodoStatus,
		removeTodo,
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => ({token: req.headers.authorization}),
});

export const graphqlHandler = server.createHandler();
