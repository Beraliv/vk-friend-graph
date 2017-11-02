const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'build.js',
		path: path.join(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			components: path.resolve(__dirname, 'src/components/')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: ['babel-loader', 'vue-loader']
			}
		]
	}
};