module.exports = {
	configureWebpack: {
		resolve: {
			fallback: {
				http: require.resolve("stream-http"),
				crypto: require.resolve("crypto-browserify"),
				url: require.resolve("url/"),
				stream: require.resolve("stream-browserify")
			},
		},

	},
	chainWebpack: (config) => {
		config.resolve.alias.set('vue', '@vue/compat')

		config.module
			.rule('vue')
			.use('vue-loader')
			.tap((options) => {
				return {
					...options,
					compilerOptions: {
						compatConfig: {
							MODE: 2
						}
					}
				}
			})
	}
}
