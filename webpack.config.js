const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'debug/debug.js'),
    devServer: {
        disableHostCheck: true,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
         title: 'Development',
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'debug')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'debug'),
        clean: true,
    }
}