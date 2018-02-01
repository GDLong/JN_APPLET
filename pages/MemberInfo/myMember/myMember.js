// myMember.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbars1: true,
    tabbars2: false,
    tabbars3: false,
    isLoad: true,
    MemerID:0,
    pageIndex:1,
    loadingM: true,
    level:2,
    ListItem:[]
  },
  tabbars1Fn: function () {
    //更新数据
    this.setData({
      tabbars1: true,
      tabbars2: false,
      tabbars3: false,
      isLoad: true,
      loadingM: true,
      pageIndex: 1,
      level: 2,
      ListItem:[]
    });
    this.autoFn()
  },
  tabbars2Fn: function () {
    //更新数据
    this.setData({
      tabbars1: false,
      tabbars2: true,
      tabbars3: false,
      isLoad: true,
      loadingM: true,
      pageIndex: 1,
      level: 3,
      ListItem: []
    })
    this.autoFn()
  },
  tabbars3Fn: function () {
    //更新数据
    this.setData({
      tabbars1: false,
      tabbars2: false,
      tabbars3: true,
      loadingM: true,
      isLoad:true,
      pageIndex: 1,
      level: 4,
      ListItem: []
    })
    this.autoFn()
  },
  scroll: function (e) {
    console.log(e)
  },
  autoFn:function(){
    var _this = this;
    app.postRequst('/GetMemberChildByLevel', {
      memberId: this.data.MemerID,
      level: this.data.level,
      startIndex: this.data.pageIndex,
      endIndex: this.data.pageIndex + 30
    }, function (res) {
      console.log('我的会员', res)
      if (res.results_size < 30){
        _this.setData({
          loadingM:false,
          ListItem: _this.data.ListItem.concat(res.results)
        })
      }else{
        _this.setData({
          loadingM:true,
          ListItem: _this.data.ListItem.concat(res.results)
        })
      }
     
      }, function (fail) {
        _this.setData({
          loadingM: false
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync("userInfo")
    this.setData({
      MemerID: userinfo[0].MemerID
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