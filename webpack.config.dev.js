const path = require('path');    //node的路径模块
const webpack=require('webpack');//引入webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        index:'./src/index.js',//在入口文件中需要引入css样式文件
        train: './src/train.js'
    },
    output: {
        publicPath:'/dist',//必须加publicPath
        path: path.resolve(__dirname,"dist"),
        filename:"js/[name]-bundle.js"
    },
    watch: true,  //监视，实时改变，更新编辑器代码
    devServer: {
      //  contentBase: path.join(__dirname,"dist"),
        host: '192.168.2.108',  // 访问地址，服务器的主机号
        port: '8080',  // 访问端口
        open: true, // 自动拉起浏览器
        hot: true, // 热加载,
        inline: true
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]//注意：loader是从右往左开始加载处理的，所以先执行css-loader
                //css-loader只是用于加载css文件,style-loader则是将打包后的css代码以<style>标签形式添加到页面头部
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({     //想要生成多个html页面，需要多次调用HtmlWebpackPlugin插件
            filename: 'index.html',
            template: './src/index.html',
            hash: true,
            chunks:["index"]    //添加引入的js,也就是entry中的key
        }),
        new HtmlWebpackPlugin({
            filename: 'shooting-star.html',
            template: './src/shooting-star.html',
            hash: true,
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            filename: 'train.html',
            template: './src/train.html',
            hash: true,
            chunks:["train"]
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from:__dirname+'/asset/css',//打包的静态资源目录地址
            to:'./asset/css' //打包到dist下面的public
        }]),
        new webpack.HotModuleReplacementPlugin()
    ]
};