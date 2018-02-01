// home.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    //
    wxlogin:{},
    //
    tabbars1:true,
    tabbars2:false,
    //
    loadmore:"为您推荐",
    //
    loadingM:true,
    //
    newProductList:[],
    //
    productList: [],
    pageIndex:1,
    isLoad:true
  },
  /**
   * 自定义函数
   */
  tabbars1Fn:function(){

  },
  tabbars2Fn: function () {

  },
  autofun:function(){
    var _this = this;
    app.phpRequst({
      action:"get_index_info",
      verify:"123456",
      auth:"test",
      params:""
    }, function (res) {
      _this.setData({
        imgUrls: res.slider_list,
        newProductList: res.goods_list
      })
    })
  },
  getGoodsList:function(){
    console.log(this.data.pageIndex)
    var _this = this;
    app.phpRequst({
      action: "get_goods_list",
      verify: "123456",
      auth: "test",
      "params[page_num]": this.data.pageIndex,
      "params[page_size]": 10,
      "params[sort_by]": "sale",
      "params[sort_order]": "asc"
    }, function (res) {
      if(res.goods.length == 0){
        _this.setData({
          isLoad: false,
          loadingM:false
        })
      }else{
        _this.setData({
          productList: _this.data.productList.concat(res.goods)
        })
      }
    })
  },
  onPageScroll: function (e) {
    // console.log(e.scrollTop)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    this.autofun()
    this.getGoodsList()
    //var that = this
    //调用应用实例的方法获取全局数据
    // app.getwxlogin(function (wxlogin) {
    //   var dataFail = wxlogin.success;
    //   if(dataFail == false){
    //     wx.showModal({
    //       title: '提示',
    //       showCancel: false,
    //       content: '为更好的体验，需要获取当前位置',
    //       success: function (res) {
    //         if (res.confirm) {
    //           wx.openSetting({
    //             success: (res) => {
    //             }
    //           })
    //         }
    //       }
    //     })
    //   }else{
    //     wx.setStorageSync("Authorization", wxlogin)
    //   }
      
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.shoppingCar();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getwxlogin(function (wxlogin) {
      var dataFail = wxlogin.success;
      if (dataFail == false) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '为更好的体验，需要获取用户授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                }
              })
            }
          }
        })
      } else {
        wx.setStorageSync("Authorization", wxlogin)
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
  // "enablePullDownRefresh":true
    // wx.showNavigationBarLoading()
    // var _this = this;
    // wx.startPullDownRefresh({
    //   success:function(res){
    //     _this.autofun()
    //     _this.getGoodsList()
    //   },
    //   fail:function(res){
    //     wx.stopPullDownRefresh()
    //   }
    // })
    // setTimeout(function(){
    //   wx.hideNavigationBarLoading()
    //   wx.stopPullDownRefresh();
    // },3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("滚到底了");
    if (this.data.isLoad){
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