const app = getApp()

Page({
  /**
   * Page initial data
   */
  data: {
    active: 0,
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,

    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
    }],

    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '精选车源',
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '新人练手',
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '通勤代步',
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '豪华品牌',
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '0过户',
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '大空间',
    }],

    timeLimitedCarList: [
      {
        id: 0,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        title: '宝马3系',
        price: '17.68万',
        oldPrice: '17.98万',
      },
      {
        id: 1,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        title: '别克君威',
        price: '13.31万',
        oldPrice: '14.36万',
      },
      {
        id: 2,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        title: '凯迪拉库XT5',
        price: '13.31万',
        oldPrice: '14.36万',
      },
    ],
  },

  // cardSwiper
  cardSwiper(e: any) {
    this.setData({
      cardCur: e.detail.current,
    })
  },

  onChange(event: any) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'success',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  goToLogs() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
})
