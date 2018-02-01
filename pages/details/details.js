var WxParse = require('../../wxParse/wxParse.js');
// details.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    image_default:'',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    numCount:"",
    numCountShow:false, 
    minusStatus: 'disabled', // 使用data数据对象设置样式名
    currentItem:'',
    organiObj:{}
  },
  onShareAppMessage :function(res){
    // if (res.from === 'button') {
    //   console.log(res.target)
    // }
    // return {
    //   title: '我是自定义转发标题',
    //   path: 'pages/details/details',
    //   imageUrl:'http://overwatch.nos.netease.com/1/assets/images/hero/doomfist/icon-portrait.png',
    //   success: function (res) {
    //     //转发成功
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }
  },
  autoFun:function(id){
    var _this = this;
    app.phpRequst({
      action: "get_goods_info",
      verify: "123456",
      auth: "test",
      "params[goods_id]": id
    }, function (res) {
      _this.setData({
        organiObj: {
          ...res,
          saleNum: 1,
          select: "circle",
          product_id: res.products.length > 0 ? res.products[0].product_id :""
        },
        currentItem: res.products.length > 0 ? res.products[0].product_id : "",
        imgUrls: res.pictures,
        image_default: res.image_default,
      })
      var article = (_this.data.organiObj.intro).replaceAll("/ueditor", "http://www.jnxcx.shop/ueditor");
      WxParse.wxParse('article', 'html', article, _this, 5);
    })
  },
  AddCar: function () {
    var _this = this;
    var pd = wx.getStorageSync('shopCar');
    var obj = [];
    if (pd.length > 0) {//购物车非空
      // 判断产品ID
      obj = pd;
      var b = _this.data.organiObj.goods_id;//当前产品ID
      var c = { being: false, index: 0 };
      obj.forEach(function (value, index, array) {
        if (value.goods_id == b) {
          return c = { being: true, index: index };
        }
      })
      if (c.being) {//存在购物车--改
        obj[c.index].saleNum = obj[c.index].saleNum + _this.data.organiObj.saleNum;
        obj[c.index].product_id = _this.data.organiObj.product_id;
      } else {//不存在购物车--增
        obj.push(_this.data.organiObj);
      }
    } else {//购物车为空--追加
      obj.push(_this.data.organiObj)
    }
    wx.setStorage({
      key: "shopCar",
      data: obj,
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        })
        _this.mathCount()
      },
      fail: function () {
        wx.showToast({
          title: '添加失败',
          icon: 'loading',
          duration: 1500
        })
      }
    })
    console.log(wx.getStorageSync('shopCar'))
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.organiObj.saleNum;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.data.organiObj.saleNum = num;
    this.setData({
      organiObj: this.data.organiObj,
      minusStatus: minusStatus
    })
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.organiObj.saleNum;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.data.organiObj.saleNum = num;
    this.setData({
      organiObj: this.data.organiObj,
      minusStatus: minusStatus
    })
  },
  goHome:function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  goCar: function () {
    wx.navigateTo({
      url: '/pages/shoppingCar/shoppingCar',
    })
  },
  checkProductId:function(e){
    var _this = this
    var productId = e.currentTarget.dataset.id
    this.data.organiObj.product_id = productId;
    this.setData({
      organiObj: _this.data.organiObj,
      currentItem: productId
    })
    console.log(this.data.organiObj)
  },
  BuyNow: function () {
    var data = this.data.organiObj
    var checked = []
    checked = checked.concat(data)
    wx.setStorage({
      key: "payChecked",
      data: checked,
      success: function (res) {
        var url = "/pages/order/order";
        app.getUserInfo(function (data) {
          wx.navigateTo({
            url: url,
          })
        });
      }
    })
   
  },
  mathCount:function(){
    var data = wx.getStorageSync('shopCar')
    if(data.length === 0){
      this.setData({
        numCountShow:false
      })
    }else{
      var _data = this.reduceNum(data)
      this.setData({
        numCountShow: true,
        numCount:_data
      })
    }
  },
  reduceNum: function (data){
    return data.reduce(function (pre, cur) {
      return pre += cur.saleNum
    }, 0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    String.prototype.replaceAll = function (s1, s2) {
      return this.replace(new RegExp(s1, "gm"), s2);
    }
    this.autoFun(options.id)
    wx.showToast({
      title: '正在加载...',
      icon: 'loading',
      mask:true
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
    this.mathCount()
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