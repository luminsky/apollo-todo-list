module.exports = {
	development: {
		username: process.env.DATABASE_USERNAME || 'postgres',
		password: process.env.DATABASE_PASSWORD || 'postgres',
		host: process.env.DATABASE_HOST || '127.0.0.1',
		dialect: 'postgres',
		logging: false,
	},
	production: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		dialect: 'postgres',
		logging: false,
	},
};
