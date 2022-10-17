import updateManager from "./utils/update-manager"

// app.ts
App<IAppOption>({
  globalData: {
    StatusBar: 44,
    CustomBar: 84,
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
    menuButtonObject: null,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: (e) => {
        this.globalData.StatusBar = e.statusBarHeight
        const capsule = wx.getMenuButtonBoundingClientRect()

        const statusBarHeight = e.statusBarHeight
        const navTop = capsule.top
        const navHeight = statusBarHeight + capsule.height + (capsule.top - statusBarHeight) * 2// 导航高度
        this.globalData.navHeight = navHeight
        this.globalData.navTop = navTop
        this.globalData.windowHeight = e.windowHeight
        this.globalData.menuButtonObject = capsule

        if (capsule) {
          this.globalData.Custom = capsule
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight
        }
        else {
          this.globalData.CustomBar = e.statusBarHeight + 50
        }
      },
    })
  },
  onShow(){
    updateManager()
  }
})
