var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: "./app",
     output: {
        path: path.resolve(__dirname, 'build'),
        filename: "js/bundle-[hash].min.js"
    },
    devServer: {
        port: 8081,
        overlay: true,
        contentBase: [path.join(__dirname, "./src")]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            })
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
            comments: false
        }), new ExtractTextPlugin({
            filename: 'css/main.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}