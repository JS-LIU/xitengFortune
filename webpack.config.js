/**
 * Created by LDQ on 2016/7/25.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
        'http://localhost:8080/': {
            target: 'http://114.251.53.22',
            secure: false,
            bypass: function (req, res, proxyOptions) {
                if (req.headers.accept.indexOf('html') !== -1) {
                    console.log('Skipping proxy for browser request.');
                    return '/index.html';
                }
            }
        }
    },
    devServer: {
        inline: true,
        port:9001
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("styles.css")
    ]
};
