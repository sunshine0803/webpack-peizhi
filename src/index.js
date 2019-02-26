// let xhr = new XMLHttpRequest;
// xhr.open('GET','/user',true)
// xhr.onload = function(){
//     console.log(xhr.response)
// }
// xhr.send();
// import './style';
// import 'bootstrap';
// import  moment from 'moment';
// // 因为不再打包locale文件，我们需要手动引入需要的语言包。
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
// let r = moment().endOf('day').fromNow();   
//  console.log(r);  
// let calc = require('./test') 
// console.log(calc.default);

// let a=1;
// let b =2;
// let c = 3;
// let d = a+b+c;
// console.log(d,"-----")




let button = document.createElement('button')
button.innerHTML = '确定'
button.onclick = function(){
    //stage-2
   import ('./test').then((data)=>{
       console.log(data)
   })
}
document.body.appendChild(button)