var app = getApp()
// order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['门店自提', '快递'],
    num: 1, // input默认是1   
    minusStatus: 'disabled', // 使用data数据对象设置样式名  
    userInfo:{},
    goodsList:[],
    user_id:'',
    saleNum:0,
    count:0.00,
    order_id:''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  toNativeAddress:function(){
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          userInfo:{...res}
        })
      },
      fail:function(res){
        if (res.errMsg.indexOf('cancel') > 0) return
        wx.showModal({
          title: '提示',
          content: '去微信设置收货地址。',
          showCancel: false,
          success:function(res){
            if (res.confirm) {
              that.openSetting()
            }
          }
        })
      }
    })
  },
  openSetting:function(){
    wx.openSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    })
  },
  //加法
  addtion: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    num++
    //把新的值给新的数组
    var newList = that.data.goodsList
    newList[index].saleNum = num

    //把新的数组传给前台
    that.setData({
      goodsList: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //减法
  subtraction: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var newList = that.data.goodsList
    //当1件时，点击移除
    if (num == 1) {
      //newList.splice(index, 1)
    } else {
      num--
      newList[index].saleNum = num
    }

    //把新的数组传给前台
    that.setData({
      goodsList: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //计算金额方法
  count: function () {
    var that = this
    //思路和上面一致
    //选中的订单，数量*价格加起来
    var newList = that.data.goodsList
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
        newCount += newList[i].saleNum * newList[i].shop_price
    }
    that.setData({
      count: newCount.toFixed(2)
    })
  }, 
  //计算数量
  countNum: function () {
    var that = this
    //遍历数组，把既选中的num加起来
    var newList = that.data.goodsList
    var allNum = 0
    for (var i = 0; i < newList.length; i++) {
      allNum += parseInt(newList[i].saleNum)
    }
    parseInt
    that.setData({
      saleNum: allNum
    })
  },
  //提交支付
  orderSubmit:function(){
    console.log(this.data.userInfo)
    var _this = this,user = this.data.userInfo;
    var data = []
    this.data.goodsList.map(function(v,i){
      var _data = {}
      _data.goods_id = v.goods_id
      _data.goods_name = v.goods_name
      _data.goods_sn = v.goods_sn
      _data.product_id = v.product_id
      _data.goods_number = v.saleNum
      _data.shop_price = v.shop_price
      data[i] = _data
    })
    var order_goods = JSON.stringify(data)
    app.phpRequst({
      action: "post_order_data",
      verify: "123456",
      auth: "test",
      "params[user_id]": this.data.user_id,
      "params[consignee][address_id]": "",//地址ID
      "params[consignee][consignee]": user.userName,//收件人姓名
      "params[consignee][tel]": user.telNumber,//手机号码
      "params[consignee][province]":user.provinceName,//省
      "params[consignee][city]":user.cityName,//市
      "params[consignee][district]":user.countyName,//区
      "params[consignee][adress]":user.detailInfo,//详细地址
      "params[consignee][country]": '中国',//国家码
      "params[consignee][zipcode]": user.postalCode,//邮编
      "params[consignee][email]": "gdl19918@163.com",//邮件
      "params[shipping]": this.data.index ? 'express' : 'cac',//配送方式ID
      "params[order_goods]": order_goods
    }, function (res) {
      _this.setData({
        order_id: res.order.order_id
      })
      _this.GetCode();
    })
  },
  GetCode:function(){
    var _this= this
    app.getCode(function (code) {
      _this.payInfo(code)
    })
  },
  payInfo:function(code){
    var _this = this;
    app.phpRequst({
      action: "get_order_pay_info",
      verify: "123456",
      auth: "test",
      "params[user_id]": this.data.user_id,
      "params[code]": code,
      "params[order_id]": this.data.order_id,
    }, function (res) {
      debugger
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var user = wx.getStorageSync('userInfo')[0];
    this.setData({
      userInfo: {
        userName: user.UserName,
        telNumber: user.Userphone,//手机号码
        provinceName:'',//省
        cityName:'',//市
        countyName:'',//区
        detailInfo:'',//详细地址
        nationalCode:'',//国家码
        postalCode: '',//邮编
      },
      user_id: user.MemerID
    })
    wx.getStorage({
      key: 'payChecked',
      success: function (res) {
        _this.setData({
          goodsList:res.data
        })
        //调用计算数目方法
        _this.countNum()
        //计算金额
        _this.count()
      }
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