const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:'./src/app.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundle.js'
	},
	devtool:"source-map",
	devServer:{
		port: 8080,
		contentBase: './dist',
	},
	module:{
		rules:[
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" },
			{ 
				test:/\.css$/, 
				use:[{
			  		loader:'css-loader'
			  	},{
			  		loader:'style-loader'
			  	}]
			},
			{ 
				test:/\.less$/, 
			  	use:[{
			  		loader:'style-loader'
			  	},{
			  		loader:'css-loader'
			  	},{
			  		loader:'less-loader'
			  	}]
			}
		]
	},
	plugins:[
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new HtmlWebpackPlugin({
			template : 'index.html',
			filename : 'index.html',
			inject: 'body'
		})
	]
}