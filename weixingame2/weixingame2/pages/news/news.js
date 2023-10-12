//index.js
//获取应用实例
const app = getApp()
var count=3
var people=4
Page({
  data: {
    disable1:false,
    one_img:'../../images/tou6.png',
    two_img: '../../images/tou6.png',
    three_img: '../../images/tou6.png',
    three_img: '../../images/tou6.png',
    four_img: '../../images/tou6.png',
    five_img: '../../images/tou6.png',
    flag:true,
    timer:null,
    msg:'开摇',
    arr:[
      '../../images/tou1.png',
      '../../images/tou2.png',
      '../../images/tou3.png',
      '../../images/tou4.png',
      '../../images/tou5.png',
      '../../images/tou6.png',
    ]
    
  },

  enter:function(event){
    let obj = this;
    if(obj.data.flag==true){
       obj.data.timer = setInterval(function () {
        let one = Math.floor(Math.random() * 6);
        let two = Math.floor(Math.random() * 6);
        let three = Math.floor(Math.random() * 6);
        let four = Math.floor(Math.random() * 6);
        let five = Math.floor(Math.random() * 6);
        obj.setData({
          one_img: obj.data.arr[one],
          two_img: obj.data.arr[two],
          three_img: obj.data.arr[three],
          four_img: obj.data.arr[four],
          five_img: obj.data.arr[five],
          flag:false,
          msg:'停止',
        })  
      });
    }
    else{
        if(count>1){
      count--;
      clearInterval(obj.data.timer);
      obj.setData({
           msg:'开摇',
           flag:true,
      })}
      else{
        count--;
        clearInterval(obj.data.timer);
        obj.setData({
             msg:'无剩余次数',
             flag:false,
        })

      }
    }
  },

  queding: function (event) {  
     
 
   },






})

