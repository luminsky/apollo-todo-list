import {ApolloServer, gql} from 'apollo-server';
import {ApolloServer as ApolloServerLambda} from 'apollo-server-lambda';
import {addTodo, createTodoList, getAuthToken, todo, todos, toggleTodoStatus, removeTodo} from './resolvers';

const PORT = process.env.PORT || 4000;

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

// Lambda
const lambdaServer = new ApolloServerLambda({
	typeDefs,
	resolvers,
	context: ({req}) => ({token: req.headers.authorization}),
});
export const graphqlHandler = lambdaServer.createHandler();
//

server.listen(PORT).then(({url}) => {
	console.log(`Server is running at ${url}`);
});
