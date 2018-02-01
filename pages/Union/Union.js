var app = getApp();
// Union.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    unionBg:"/images/lol-banner.jpg",
    //
    tabbars1: true,
    tabbars2: false,
    //
    businessList: []
  },
  tabbars1Fn: function () {
    //更新数据
    this.setData({
      tabbars1: true,
      tabbars2: false
    })
  },
  tabbars2Fn: function () {
    //更新数据
    this.setData({
      tabbars1: false,
      tabbars2: true
    })
  },
  viewMapLocal: function (event){
    var latitude = event.currentTarget.dataset.ly;//纬度
    var longitude = event.currentTarget.dataset.lx;//经度
    console.log(latitude, longitude)
    wx.openLocation({
      latitude: longitude,
      longitude: latitude,
      scale: 28,
      complete:function(e){
        
      },
      fail:function(res){
        
      }
    })
  },
  autoFun: function (map){
    var _this = this;
    app.postRequst('/GetShopList', {
      lat2:map.lat,
      lng2:map.log
     }, function (res) {
      _this.setData({
        businessList:res.results
      })
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.showToast({
     title: '正在加载...',
     icon: 'loading',
     mask: true
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
    var map = {}, _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        map.lat = (res.latitude).toString()
        map.log = (res.longitude).toString()
        _this.autoFun(map)
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '为更好的体验，需要获取当前位置',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                }
              })
            }
          }
        })
      }
    })

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