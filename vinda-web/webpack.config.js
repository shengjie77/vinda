const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.ts',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	resolve: {
		plugins: [
			new TsconfigPathsPlugin(),
		],
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Vinda',
		}),
	],
	devServer: {
		contentBase: './dist',
	},
	devtool: 'source-map',
	mode: 'development',
};