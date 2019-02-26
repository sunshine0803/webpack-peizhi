let path = require('path')
let HtmlWebPackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack')
module.exports = {
    entry:{
        home:'./src/index.js',
    },
    output:{
        filename:'main[hash].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:'/\.js$/',
               loader: 'happypack/loader?id=js'
            }
        ],
        noParse: /jquery/, 
      
    },
    resolve:{
        // modules:[path.resolve('node_modules')],
        extensions:['.js','.css','.json','.vue'],
        alias:{
            bootstrap:"bootstrap/dist/css/bootstrap.css",
            '@':path.resolve('src')
        },
        // mainFiles:['style','main']
    },
    plugins:[
        new Happypack({
            id:'js',
            use:[{
                    loader:'babel-loader',
                    options:[{
                    presets:['@babel/preset-env'],
                    plugins:['@babel/plugin-syntax-dynamic-import']
                    }]
                }]
        }),
        new HtmlWebPackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin('./dist'),
        new CopyWebpackPlugin([
            {from:'img',to:'./img'}
        ]),
        new webpack.BannerPlugin('made 2019 by cc'),
        new webpack.IgnorePlugin(/\.\/locale/,/'moment'/)
    ],
   
}