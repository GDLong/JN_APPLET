// pages/MemberInfo/myOrderInfo/myOrderInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "周杰伦",
    address: "江苏省常州市新北区 太湖东路 软件园 9-4 2001",
    telNumber: "15295067572",
    clock: 60,
    orderProductList: [{
      image: "https://gw3.alicdn.com/bao/uploaded/i2/2091321182/TB1JKx7SVXXXXaraXXXXXXXXXXX_!!0-item_pic.jpg_210x210.jpg",
      title: "Metabolic醇素X酵母精华粒",
      desc: "减肥排毒60粒",
      price: "219.00",
      num: "1"
    }, {
      image: "https://gw3.alicdn.com/bao/uploaded/i2/2091321182/TB1JKx7SVXXXXaraXXXXXXXXXXX_!!0-item_pic.jpg_210x210.jpg",
      title: "Metabolic醇素X酵母精华粒",
      desc: "减肥排毒60粒",
      price: "220.00",
      num: "3"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.countdown(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})