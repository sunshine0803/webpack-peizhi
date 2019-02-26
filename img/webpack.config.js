let path = require('path')
let HtmlWebPackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
module.exports = {
    mode:'production',
    devServer:{
        contentBase:'./dist'
        // before(app){
        //     app.get('/user',function(req,res){
        //         res.json({name:"hanmeimei"})
        //     })
        // },
        // proxy:{
        //     "/api":{
        //         target:"http://localhost:3000",
        //         pathRewrite:{
        //             "/api":""
        //         }
        //     }
        // }
    },
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
            }
          
        ]
    },
    resolve:{
        // modules:[path.resolve('node_modules')],
        extensions:['.js','.css','.json','.vue'],
        alias:{
            // bootstrap:"bootstrap/dist/css/bootstrap.css",
            // '@':resolve('src')
        },
        mainFiles:['style','main']
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin('./dist'),
        new CopyWebpackPlugin([
            {from:'img',to:'./img'}
        ]),
        new webpack.BannerPlugin('made 2019 by cc')
    ]
}