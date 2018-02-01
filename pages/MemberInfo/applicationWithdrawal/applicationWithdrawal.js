var app = getApp();
// applicationWithdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },
  formSubmit: function (e) {
    var data = e.detail.value.applicatMoney;
    if (data != "" && Number.isInteger(data/100)){
      app.postRequst('/MemberBeCash', {
        memberId: this.data.userInfo.MemerID,
        flowMoney: e.detail.value.applicatMoney
      }, function (res) {
        console.log('提现申请', res)//-1：还有待提现的申请未处理，暂时不能提现 0:提现异常 >0:提现申请成功
        var n = res.results[0].state;
        switch (n) {
          case -1:
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '还有待提现的申请未处理，暂时不能提现',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            break;
          case 0:
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '提现异常',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            break;
          case n > 0:
            wx.showToast({
              title: '提现申请成功',
              icon: 'success',
              duration: 2000
            })
            break;
        }
      })
    }else{
      wx.showModal({
        title: '提现提示',
        showCancel: false,
        content: '提现金额不能为空且提现金额必须是100的整数倍！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo[0]
    })
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