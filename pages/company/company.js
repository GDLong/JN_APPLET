// company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unionBg: "/images/about-banner.jpg",
    //
    tabbars1: true,
    tabbars2: false,
    tabbars3: false,
    tabbars4: false,
    newsList:[{
      title:"再创辉煌--犟牛公司成功挂牌“科技创新板”！",
      id:"20171102",
      date:"2017-11-02"
    },{
      title: "热烈祝贺江苏犟牛与台湾全讯国际达成战略合作！",
      id: "20171013",
      date: "2017-10-13"
      }, {
        title: "[暨阳最强音总决赛]目标星光大道！首届“犟牛杯”全民K歌大赛圆满落幕！",
        id: "20170620",
        date: "2017-06-20"
    }, {
        title: "犟牛公司董事长项翔先生荣获“第17届中国世纪大采风CCTV年度英才人物”大奖！",
        id: "20170520",
        date: "2017-05-20"
      }, {
        title: "热烈祝贺江苏犟牛荣获“中国影响力品牌”多项大奖！",
        id: "20170429",
        date: "2017-04-29"
    }, {
        title: "增值电信业务经营许可证是什么？有什么用？",
        id: "20170220",
        date: "2017-02-20"
      }, {
        title: "热烈祝贺江苏犟牛网络技术有限公司成功挂牌上市！",
        id: "20170121",
        date: "2017-01-21"
    }, {
        title: "热烈祝贺江苏犟牛再获三项软件产品认定证书！",
      id: "20161205",
      date: "2016-12-05"
    }]
  },
  tabbars1Fn: function () {
    //更新数据
    this.setData({
      tabbars1: true,
      tabbars2: false,
      tabbars3: false,
      tabbars4: false
    })
  },
  tabbars2Fn: function () {
    //更新数据
    this.setData({
      tabbars1: false,
      tabbars2: true,
      tabbars3: false,
      tabbars4: false
    })
  },
  tabbars3Fn: function () {
    //更新数据
    this.setData({
      tabbars1: false,
      tabbars2: false,
      tabbars3: true,
      tabbars4: false
    })
  },
  tabbars4Fn: function () {
    //更新数据
    this.setData({
      tabbars1: false,
      tabbars2: false,
      tabbars3: false,
      tabbars4: true
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