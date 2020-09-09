let path = require("path");
require('babel-polyfill');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
    entry: {
        app: ['babel-polyfill', "./src/app/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
        publicPath: "dist/",
        sourceMapFilename: "main.map"
    },
    devServer: {
        contentBase: './src',
        overlay: true,
        port: 3001,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            inject: 'body'
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
        ]
    }
}

module.exports = conf;