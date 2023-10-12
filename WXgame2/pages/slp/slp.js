const app = getApp()
Page({
  data: {
    pr: '',
    sum1: '',
    gamesum:''
  
  },

  jump() {
    app.globalData.pr = this.data.pr,
    app.globalData.sum1 = this.data.sum1,
    app.globalData.gamesum = this.data.gamesum,
    console.log(app.globalData.pr)
    console.log(app.globalData.sum1)
    console.log(app.globalData.gamesum)

    wx.navigateTo({
      url: '../clp2/clp2',
    })
  },
 getpr(e) {
    this.setData({
      pr: e.detail.value
    });
    //console.log(this.data.pr)
  },
  
  getsum1(e){
    this.setData({
      sum1: e.detail.value
    });
    //console.log(this.data.sum1)
  },
  getgamesum(e){
    this.setData({
      gamesum: e.detail.value
    });
    //console.log(this.data.gamesum)
  },
  onLoad: function () {
    
  },

  onShow: function () {
    // 页面显示时触发
  },

  onHide: function () {
    // 页面隐藏时触发
  },

  onUnload: function () {
    // 页面卸载时触发
  },

  
  // 监听输入框输入事件

});