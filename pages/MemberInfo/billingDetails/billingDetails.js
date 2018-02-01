// pages/MemberInfo/billingDetails/billingDetails.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    memberID: 0,
    type: 0,
    startIndex: 1,
    evetType: 103, 
    tabbars: 1,
    srollHeight: 0,
    loadingM: true,
    ListItem: [],
    isLoad: true
  },
  tabbars1Fn: function () {
    //商品销售
    this.setData({
      type: 0,
      startIndex: 1,
      evetType: 103,
      loadingM: true,
      isLoad: true,
      tabbars: 1,
      ListItem: []
    })
    this.autoFn()
  },
  tabbars2Fn: function () {
    //业务奖金
    this.setData({
      type: 0,
      startIndex: 1,
      evetType: 1,
      loadingM: true,
      isLoad: true,
      tabbars: 2,
      ListItem: []
    })
    this.autoFn()
  },
  tabbars3Fn: function () {
    //金币余额
    this.setData({
      type: 1,
      startIndex: 1,
      evetType: 0,
      loadingM: true,
      isLoad: true,
      tabbars: 3,
      ListItem: []
    })
    this.autoFn()
  },
  tabbars4Fn: function () {
    //积分余额
    this.setData({
      type: 2,
      startIndex: 1,
      evetType: 0,
      loadingM: true,
      isLoad: true,
      tabbars: 4,
      ListItem: []
    })
    this.autoFn()
  },
  autoFn:function(){
    var _this = this
    var data = {
      memberId: this.data.memberID,
      type: this.data.type,
      evetType:this.data.evetType,
      startIndex: this.data.startIndex,
      endIndex: this.data.startIndex + 30,
    }
    app.postRequst('/AccountShopListPage', { 
        ...data
      }, function (res) {
        if (res.results_size < 30) {
          _this.setData({
            loadingM: false,
            ListItem: _this.data.ListItem.concat(res.results)
          })
        } else {
          _this.setData({
            loadingM: true,
            ListItem: _this.data.ListItem.concat(res.results)
          })
        }
    },function(fail){
      _this.setData({
        loadingM: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')[0];
    this.setData({
      memberID: userInfo.MemerID,
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
    if (this.data.isLoad) {
      this.setData({
        pageIndex: this.data.pageIndex + 30
      })
      this.autoFn()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})