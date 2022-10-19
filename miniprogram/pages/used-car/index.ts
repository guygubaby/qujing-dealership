import { onPageScroll } from '../../utils/page-scroll'
import { genId } from '../../utils/gen-id'

Page({
  data: {
    navOpacity: 0,

    isRefreshing: false,

    swiperList: [
      {
        id: genId(),
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      },
      {
        id: genId(),
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      },
      {
        id: genId(),
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      },
    ],

    iconList: [
      {
        icon: 'i-carbon-sun',
        color: 'red',
        badge: 120,
        name: '精选车源',
      },
      {
        icon: 'i-carbon-fire',
        color: 'orange',
        badge: 1,
        name: '新人练手',
      },
      {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '通勤代步',
      },
      {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: '豪华品牌',
      },
      {
        icon: 'upstagefill',
        color: 'cyan',
        badge: 0,
        name: '0过户',
      },
      {
        icon: 'clothesfill',
        color: 'blue',
        badge: 0,
        name: '大空间',
      },
    ],

    brandList: [
      {
        id: genId(),
        name: '长安',
      },
      {
        id: genId(),
        name: '荣威',
      },
      {
        id: genId(),
        name: '奔驰',
      },
      {
        id: genId(),
        name: '宝马',
      },
      {
        id: genId(),
        name: '奥迪',
      },
      {
        id: genId(),
        name: '本田',
      },
      {
        id: genId(),
        name: '丰田',
      },
      {
        id: genId(),
        name: '大众',
      },
    ],

    timeLimitedCarList: [
      {
        id: genId(),
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        title: '宝马3系',
        price: '17.68万',
        oldPrice: '17.98万',
      },
      {
        id: genId(),
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        title: '别克君威',
        price: '13.31万',
        oldPrice: '14.36万',
      },
      {
        id: genId(),
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        title: '凯迪拉库XT5',
        price: '13.31万',
        oldPrice: '14.36万',
      },
      {
        id: genId(),
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        title: '宝马3系',
        price: '17.68万',
        oldPrice: '17.98万',
      },
      {
        id: genId(),
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        title: '别克君威',
        price: '13.31万',
        oldPrice: '14.36万',
      },
      {
        id: genId(),
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        title: '凯迪拉库XT5',
        price: '13.31万',
        oldPrice: '14.36万',
      },
    ],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {},

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    this.getTabBar().init()
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {},

  onPageScroll,

  onPullDownRefresh() {
    if (this.data.isRefreshing)
      return

    this.setData({
      isRefreshing: true,
    })

    setTimeout(() => {
      wx.stopPullDownRefresh()
      this.setData({
        isRefreshing: false,
      })
    }, 2 * 1000)
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {},

  handleClickItem(e: IDataSet<{ id: number }>) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../car-detail/index?id=${id}`,
    })
  },
})
