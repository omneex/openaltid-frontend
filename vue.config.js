module.exports = {
	configureWebpack: {
		resolve: {
			fallback: {
				http: require.resolve('stream-http'),
				crypto: require.resolve('crypto-browserify'),
				url: require.resolve('url/'),
				stream: require.resolve('stream-browserify'),
			},
		},

	},
};
