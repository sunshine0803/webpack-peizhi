let {smart} = require('webpack-merge');
let base = require('./webpack.base');
let UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 合并base文件
module.exports = smart(base,{
    mode:'production',
    optimization:{
        minimizer:[
            new UglifyJsWebpackPlugin({
                cache: true,  
                parallel: true, 
                sourceMap: true
              }),
              new OptimizeCssAssetsWebpackPlugin({}),
        ]
      }

})