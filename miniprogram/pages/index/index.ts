Page({
  data: {
  },
  onLoad() {
    console.log('foo')
  },
  gotologpage() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
})
