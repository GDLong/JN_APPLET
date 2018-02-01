// signIn.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    text:"",
    total:'',
    val:''
  },
  autoFn:function(){
    var _this = this
    var data = new Date();
    app.postRequst('/GetPoint', {
      memberId: this.data.userInfo.MemerID,
      dt: data.toISOString()
    }, function (res) {
      _this.setData({
        text: '恭喜您，签到成功',
        total: res.results[0].TotalPoint,
        val: res.results[0].val
      })
      if (res.results[0].state == 2) {//签到成功
        wx.showModal({
          title: '签到提醒',
          showCancel: false,
          content: '恭喜签到成功！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      } else if (res.results[0].state == 1) {//已签到
        wx.showModal({
          title: '签到提醒',
          showCancel: false,
          content: '今日已签到，请明日再来！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo[0]
    })
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