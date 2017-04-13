const path = require('path');
const webpack = require("webpack");
const node_modules = path.resolve(__dirname, 'node_modules');

const config = {
    // 配置入口文件--主文件
    entry: [
        path.resolve(__dirname, 'src/main')
    ],
    // entry : [
    //     './src/main',
    //     './src/extends/sdk',
    //     // 'http://wan.keejoy.com/sdk/keejoySDK.js?v=358682'
    // ],
    // 配置webpack打包文件及文件位置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'built/local')
    },
    devtool: 'source-map',
    resolve: {
        // 设置require加载文件默认格式
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style-loader!css-loader' // Run both loaders
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'url-loader?limit=1024*200&name=images/[hash:8].[name].[ext]'
            },
        ]
    },
    devServer : {
        contentBase : './built/local'  //设置默认加载路径
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false ,'process.env': {
            NODE_ENV: JSON.stringify('production')
        }}),
        //压缩打包生成的JS文件
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments(注释)
            },
            compress: {
                warnings: false //不显示警告
            }            
        })
    ],
    node: {
        __dirname: true
    }
}
module.exports = config;