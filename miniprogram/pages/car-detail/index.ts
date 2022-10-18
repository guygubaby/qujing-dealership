import { onPageScroll } from '../../utils/page-scroll'

let uid = 0

Page({

  /**
   * Page initial data
   */
  data: {
    swiperList: [
      {
        id: ++uid,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      },
      {
        id: ++uid,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      },
      {
        id: ++uid,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      },
    ],

    navOpacity: 0,
    isRefreshing: false,
  },

  handleBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

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
   * Lifecycle function--Called when page load
   */
  onLoad({ id }: { id: string }) {
    console.log(id)
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
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
})
