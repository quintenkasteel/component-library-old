var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index_bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: [
							"syntax-class-properties",
							"@babel/proposal-class-properties"
						]
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader"
				]
			},
			{
				test: /\.svg$/,
				loader: "svg-inline-loader"
			}
		]
	},
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html"
		})
	]
};
