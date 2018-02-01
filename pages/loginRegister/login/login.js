// login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneValue:"",
    passwordValue:"",
    defaultSize: 'default',
    disabled: false,
    loading: false
  },
  loginSubmit: function (e) {
    var _this = this;
    if (e.detail.value.phoneNumber == '') {
      wx.showToast({
        title: '请输入账号！'
      })
      return;
    }
    if (e.detail.value.passwordNumber == '') {
      wx.showToast({
        title: '请输入密码！'
      })
      return;
    }
    this.setData({
      loading:true,
      disabled:true
    })
    // 请求登陆接口;
    app.postRequst('/UserLogin', { 
      userAccount: e.detail.value.phoneNumber,
      password: e.detail.value.passwordNumber
      }, function (res) {
        if (res.return_code === 0) {
          //存储用户信息
          wx.setStorage({
            key: "userInfo",
            data: res.results
          })
          wx.showToast({
            title: "登录成功！"
          })
          setTimeout(function(){
            wx.navigateBack();
          },1500)
        }else{
          _this.setData({
            loading: false,
            disabled: false
          });
        }
    })
    
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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