// myOrder.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    tabbars1:true,
    tabbars2:false,
    tabbars3:false,
    tabbars4:false,
    show1:false,
    pageIndex:1,
    pageSize:15,
    status:'100'
  },
  tabbars1Fn: function () {//待付款
    this.setData({
      orderList: [],
      tabbars1: true,
      tabbars2: false,
      tabbars3: false,
      tabbars4: false,
      pageIndex: 1,
      status: '100'
    })
    this.autofun()
  },
  tabbars2Fn: function () {//待发货
    this.setData({
      orderList: [],
      tabbars1: false,
      tabbars2: true,
      tabbars3: false,
      tabbars4: false,
      pageIndex: 1,
      status: '101'
    })
    this.autofun()
  },
  tabbars3Fn: function () {//已完成
    this.setData({
      orderList: [],
      tabbars1: false,
      tabbars2: false,
      tabbars3: true,
      tabbars4: false,
      pageIndex: 1,
      status: '102'
    })
    this.autofun()
  },
  tabbars4Fn: function () {//已发货
    this.setData({
      orderList: [],
      tabbars1: false,
      tabbars2: false,
      tabbars3: false,
      tabbars4: true,
      pageIndex: 1,
      status: '104'
    })
    this.autofun()
  },
  autofun:function(){
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    app.phpRequst({
      action: "get_order_list",
      verify: "123456",
      auth: "test",
      "params[user_id]": userInfo[0].MemerID,
      "params[status]": this.data.status,//1:finished已完成	2:await_shi待发货	3:unconfirmed未确认
      "params[page_num]": this.data.pageIndex,
      "params[page_size]": this.data.pageSize
    }, function (res) {
      console.log('订单信息', res)
      _this.setData({
        orderList: _this.data.orderList.concat(res)
      })
      if (_this.data.orderList.length === 0){
        _this.setData({
          show1:false
        })
      }else{
        _this.setData({
          show1: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.autofun("100")
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
    console.log("滚到底了");
    if (this.data.isLoad) {
      this.setData({
        pageIndex: ++this.data.pageIndex
      })
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})