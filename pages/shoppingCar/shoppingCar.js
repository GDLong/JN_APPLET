// pages/shoppingCar/shoppingCar.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    allSelect: "circle",
    num: 0,
    count: 0,
    show1:false,
    show2:false,
    checked:[]
  },
  change: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到选中状态
    var select = e.currentTarget.dataset.select

    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }

    //把新的值给新的数组
    var newList = that.data.list
    newList[index].select = stype
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    var successNum = 0;
    newList.map(function(n){
      if (n.select == "circle"){
        successNum++
      }
    })
    if (successNum == 0){
      that.setData({
        allSelect: "success",
      })
    }else{
      that.setData({
        allSelect: "circle",
      })
    }
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //加法
  addtion: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //默认99件最多
    if (num < 100) {
      num++
    }
    //把新的值给新的数组
    var newList = that.data.list
    newList[index].saleNum = num

    //把新的数组传给前台
    that.setData({
      list: newList
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
    var newList = that.data.list
    //当1件时，点击移除
    if (num == 1) {
      //newList.splice(index, 1)
    } else {
      num--
      newList[index].saleNum = num
    }

    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //删除
  deleteItem: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var newList = that.data.list
    wx.showModal({
      title: '',
      content: '确定要删除该商品吗',
      success: function (res) {
        if (res.confirm) {
          newList.splice(index, 1)
          var data = wx.getStorageSync('shopCar');
          data.splice(index,1)
          wx.setStorageSync('shopCar',data )
          //把新的数组传给前台
          that.setData({
            list: newList
          })
          //调用计算数目方法
          that.countNum()
          //计算金额
          that.count()
          console.log('用户点击确定')
          if(that.data.list.length < 1){
            that.setData({
              show1: false,
              show2:true
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //全选
  allSelect: function (e) {
    var that = this
    //先判断现在选中没
    var allSelect = e.currentTarget.dataset.select
    var newList = that.data.list
    if (allSelect == "circle") {
      //先把数组遍历一遍，然后改掉select值
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    that.setData({
      list: newList,
      allSelect: select
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //计算数量
  countNum: function () {
    var that = this
    //遍历数组，把既选中的num加起来
    var newList = that.data.list
    var allNum = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        allNum += parseInt(newList[i].saleNum)
      }
    }
    parseInt
    console.log(allNum)
    that.setData({
      saleNum: allNum
    })
  },
  //计算金额方法
  count: function () {
    var that = this
    //思路和上面一致
    //选中的订单，数量*价格加起来
    var newList = that.data.list
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        newCount += newList[i].saleNum * newList[i].shop_price
      }
    }
    that.setData({
      count: newCount.toFixed(2)
    })
  },
  //组织购物车列表
  shopCarObj: function () {
    var _this = this
    var a = wx.getStorageSync('shopCar')
    if (a.length > 0) {
      this.setData({
        list: a,
        show1:true
      })
      this.data.list.map(function (n) {
        if (n.select == "circle") {
          _this.setData({
            allSelect: "circle"
          })
        }
      })
    }else{
      this.setData({
        show2: true
      })
    }
  },
  goPay:function(){
    var checked = []
    this.data.list.map(function(n){
      if (n.select == "success") {
        checked = checked.concat(n)
      }
    })
    if (checked.length == 0) {
      wx.showModal({
        title:"提示",
        content:"请勾选提交！",
        showCancel: false,
        success:function(res){
          //
        }
      })
      return
    }
    wx.setStorage({
      key: "payChecked",
      data: checked,
      success:function(res){
        var url = "/pages/order/order";
        app.getUserInfo(function (data) {
          wx.navigateTo({
            url: url,
          })
        });
      }
    })    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.shopCarObj()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.setStorageSync('shopCar', this.data.list)
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