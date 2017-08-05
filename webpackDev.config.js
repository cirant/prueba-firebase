var path = require('path');

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: "./app",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.min.js"
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
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    }
}