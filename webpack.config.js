var webpack = require('webpack');
var path = require("path");
var rootDir = path.resolve(__dirname);
var appDir = path.resolve(rootDir, 'app');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
//页面入口文件配置
    entry: {
        'index':'./src/index.js',
    },
//入口文件输出配置
    output: {
        path: path.resolve(rootDir,'./dist'),
        filename: '[name].js'
    },
    module: {
        loaders:[
			{
				test: /\.css$/, 
				loader: 'style-loader!css-loader' 
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader?limit=50000',
				options: {
				  name: '[name].[ext]?[hash]'
				}
			},
		]
    },
	resolve: {
        alias: {
            'easyui': path.resolve(rootDir, './src/jquery.easyui.min.js'), //version 1.5.1
            'prettify': path.resolve(rootDir, './src/prettify/prettify.js'),
        }
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		  compress: {
			warnings: false
		  }
		}),
		new webpack.ProvidePlugin({
		  $:"jquery",
		  jQuery:"jquery",
		  "window.jQuery":"jquery"
		}),
		new webpack.ProvidePlugin({
		  showdown:"showdown",
		  "window.showdown":"showdown"
		}),
		new webpack.ProvidePlugin({
		  prettify:"prettify",
		  "window.prettify":"prettify"
		})
	]
}