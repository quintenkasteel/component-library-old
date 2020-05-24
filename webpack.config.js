var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index_bundle.js"
	},
	resolve: {
		alias: {
			"react-dom": path.resolve(
				path.join(__dirname, "./node_modules/@hot-loader/react-dom")
			)
		}
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: [
							"react-hot-loader/babel",
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
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: ["file-loader"]
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
