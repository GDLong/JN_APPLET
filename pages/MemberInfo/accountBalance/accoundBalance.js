var app = getApp();
// accoundBalance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountBalance:'',//账户余额
    sumMoney:'',//平台总收益	
    todayMomey:'',//今日收益
    reqMoney: '',//已提现		
    unReqMoney: '',//未提现		
    sumJinBi:'',//消费总额
    todayJinBi:'',//今日总额	
    today: '',//今日销售
    total: '',//销售总额
    ReqList:[]
  },
  loadMoundth:function(){
    var _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    app.postRequst('/GetMemberBalance', { memberId: userInfo[0].MemerID }, function (res) {
      _this.setData({
        accountBalance: res.results[0].Balance
      })
    })
    app.postRequst('/GetMemberReport', { memberId: userInfo[0].MemerID }, function (res) {
      _this.setData({
        sumMoney: res.results[0].sumMoney,//平台总收益	
        todayMomey: res.results[0].todayMomey,//今日收益
        reqMoney: res.results[0].reqMoney,//已提现		
        unReqMoney: res.results[0].unReqMoney,//未提现		
        sumJinBi: res.results[0].sumJinBi,//消费总额
        todayJinBi: res.results[0].todayJinBi,//今日总额	
      })
    })
    app.phpRequst({
      action: "get_sell_info",
      verify: "123456",
      auth: "test",
      "params[user_id]": userInfo[0].MemerID
    }, function (res) {
      _this.setData({
        today: res.today,
        total: res.total
      })
    })
    app.postRequst('/GetMemberReqList', { 
      memberId: userInfo[0].MemerID,
      startIndex:1,
      endIndex:2
      }, function (res) {
      console.log('提现明细',res)
      _this.setData({
        ReqList: res.results
      })
    })
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
    this.loadMoundth()
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