const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
let prodPlugins = [];
let devtool;
let cache = true;

if(isProd) {
	cache = false;
	devtool = 'source-map';
	watch = false;
	prodPlugins = prodPlugins.concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
		new webpack.optimize.DedupePlugin(),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true,
				},
			},
			canPrint: true,
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				comparisons: true,
				dead_code: true,
				screw_ie8: true,
				unsafe: true,
				unsafe_comps: true,
			},
			mangle : {
				screw_ie8 : true,
			},
			output: {
				screw_ie8 : true,
				comments: false,
			},
			sourceMap: false,
			warnings: false,
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
	]);
}


module.exports = {
	devtool,
	cache,
	entry: [
		'./src/js/index.js',
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'app'),
				],
				exclude: [
					path.resolve(__dirname, 'node_modules'),
				],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
					},
				},
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				}),
			}, {
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				},
			}, {
				test: require.resolve('jquery'),
				use: [{
					loader: 'expose-loader',
					options: 'jQuery',
				},{
					loader: 'expose-loader',
					options: '$',
				}],
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
	].concat(prodPlugins),
};
