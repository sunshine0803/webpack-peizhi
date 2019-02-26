## webpack  配置篇 

## 打包多页应用
- src 下面创建4个文件 index.html b.html index.js b.js 
- 入口需要配置成对象
```
entry:{
		home:'./src/index.js'
		b:'./src/b.js'
	}
```
- 出口需要多个出口，改变filename的写法
filename:'[name.js]' 
- 保证html页面引入自己对应的js
- chunks 代码块 来完成  
chunks:['home']  
如果home也许使用other 
chunks:['home','other']

## 配置soure-map源码映射 作用 用来调试源码
- mode:'production' 

```
devtool:'source-map'

```
- 测试 npm run dev
- source-map 会单独生成一个sourcemap文件 可以帮我们调试源代码 会显示当前报错的列和行

- eval-source-map 不会产生单独的文件 但是会显示报错的行和列

- cheap-module-source-map 不会产生列 但是是一个单独的文件 

- cheap-module-eval-source-map 不会产生文件也不会产生列 会直接集成在文件里 

## 实时编译
watch:true 
- 监控的选项
```
watchOptions:{
	poll:1000  //每秒问我多少次
	aggreatmentTimeout:500 //防抖 一直输入代码
	ignored:/node_modules/
}
```
##  webpcak 常用插件
-  yarn add clean-webpack-plugin -D
1. 清除缓存插件,可以写字符串 也可以写成数组

   new CleanWebpackPlugin('./dist'),
2. 拷贝插件
- yarn add copy-webpack-plugin -D
  new CopyWebpackPlugin([ //
       {from:'img',to:'./img'}
     ]),
3. 版权插件 webpack自带插件 所有人需要写
 let webpack = require('webpack')
 new webpack.BannerPlugin('made 2019 by ry')

## webpack处理 跨域问题
- 在index.js里写
、、、
   let xhr = new XMLHttpRequest;
   xhr.open('GET','/user',true)
   xhr.onload = function(){
      console.log(xhr.response)
   }
   xhr.send();
、、、
- 在server.js 里写
、、、
   let express = require('express')
   let app = express()
   app.get('/user',function(req,res){
      res.json({name:'lilei'})
   })
   app.listen(3000)
、、、
1. 代理的方式  重写的方式 把请求代理到express服务器上 
- target 访问http://localhost:3000等于访问 当前服务器下面'/api'
- pathRewrite 重写路径 /api/user 等于访问localhost:3000/user
```
 proxy:{ // 
      '/api':{
         target:'http://localhost:3000',
         pathRewrite:{
            '/api':''
            }
       }// 配置了一个代理
    }
```
2.  我们前端只想单纯来模拟数据
```
   before(app){ // 提供的方法 钩子
       app.get('/user',(req,res)=>{
         res.json({name:'leilei'})
       })
    }
```
3. 有服务端 不用用代理来处理 能不能再服务端中启动webpack 端口用服务端端口
- yarn add webpack-dev-middleware -D
server.js修改如下 
```
let express = require('express')
let app = express()
let webpack = require('webpack')
let  middle= require('webpack-dev-middleware')
let config = require('./webpack.config.js')
let compiler = webpack(config)
app.use(middle(compiler))
app.get('/user',function(req,res){
    res.json({name:'lilei'})
})
app.listen(3000)
```
    
## resolve用法（解析别名）
modules:可以直接指定查找的目录层级，不再往上一级目录去找
extensions 拓展名 在import引用的时候可以省略文件的后缀名

alias:别名  bootstrap:'bootstrap/dist/css/bootstrap.css'
bootstrap 名字：后边是对应的路径  在每个包的package.json里边会先查找main字段   main是主入口的意思   然后再查找其他的字段

mainFields  可以配置先找哪个入口 mainFiles:['style','main']
mainFiles：入口文件的名字 通常都是index.js 
```
resolve:{
 modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
    mainFields:['style','main']
    mainFiles:[], // 入口文件的名字 index.js
    alias:{ 
       bootstrap:'bootstrap/dist/css/bootstrap.css'
    }
 }
```
## 区分环境
- yarn add webpack-merge
webpack.config.js改成 webpack.base.js
新建文件 webpack.prod.js 和  
- 配置开发环境的写法
- smart 是最简化版的
```
webpack.dev.js 
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'development',
   devServer:{

   },
   devtool:'source-map'
})
```
- 配置生产环境的写法 
```
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'production',
   optimization:{
     minimizer:[

     ]
   },
   plugins:[
     
   ]
})
```
##webpack 优化

1. noparse 
- yarn add jquery
      module: 
         { noParse: /jquery/,
         // 不去解析jquery中的依赖库 
         ... 
         }
2. IgnorePlugin(忽略)     webpack 内置插件 以moment 库为例
- yarn add moment
- index.js内容
 import moment from 'moment';
 -设置语言

 -手动引入所需要的语言
 import 'moment/locale/zh-cn'

 moment.locale('zh-cn');//cn代表中国  也可以写其他的国家


 let r = moment().endOf('day').fromNow();   
 console.log(r);
- 插件写法  不打包当前目录下面的locale文件夹
new webpack.IgnorePlugin(/\.\/locale/, /moment/)

3. happypack 可以使用多线程来打包 yarn add happypack -js多线程打包 改变babel-loader的写法
      {
         test: /\.js$/,
         exclude: /node_modules/,
         include: path.resolve('src'),
         use: {
            loader: 'happypack/loader?id=js'
         }
      }
- happpypack loader必须是数组
- yarn add @babel/core  @babel/preset-env  babel-loader   

 new Happypack({
            id:'js',
            use:[{
                    loader:'babel-loader',
                    options:[{
                    presets:['@babel/env-preset'],
                    plugins:['@babel/plugin-syntax-dynamic-import']
                    }]
                }]
        }),
css 也可以实现多线程打包
    {
      test: /\.css$/,
      use: 'Happypack/loader?id=css'
    }
   new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    })
## webpack 自带优化
index.js 代码
- import calc from './test';
// import 在生产环境下 会自动去除掉没用的代码
// tree-shaking 把没用到的代码 自动删除掉
// es6 模块会把结果放到defalut上
// let calc = require('./test');
//使用require引入es6导出的模块 模块会把结果放到default上


- // scope hosting 作用域提升 
let a = 1;
let b = 2;
let c = 3;
let d = a+b+c; // 在webpack中自动省略 可以简化的代码
console.log(d,'-------------');

console.log(calc.default.sum(1,2));
- test.js代码
et sum = (a, b) => {
  return a + b + 'sum';
}

let minus = (a, b) => {
  return a - b + 'minus';
}

export default {
  sum, minus
}
## 懒加载
   
##  抽离公共代码(多入口)
optimization:{ // commonChunkPlugins
    splitChunks:{ // 分割代码块
      cacheGroups:{ // 缓存组
        common:{ // 公共的模块
          chunks:'initial',
          minSize:0,
          minChunks:2,
        },
        vendor:{ //第三方模块  
          priority:1, //权重
          test:/node_modules/, // 把你抽离出来
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }






















