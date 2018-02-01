// pages/Address/adddress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  autoFn:function(){
    var _this = this;
    app.phpRequst({
      action: "get_user_address_list",
      verify: "123456",
      auth: "test",
     "params[user_id]": ""
    }, function (res) {
      _this.setData({
        imgUrls: res.slider_list,
        newProductList: res.goods_list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.autoFn()
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