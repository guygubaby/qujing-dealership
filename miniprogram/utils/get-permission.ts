export const getPermission = ({ code, name }: { code: string; name: string }) => {
  return new Promise<void>((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        // @ts-expect-error ignore this line
        if (res.authSetting[code] === false) {
          wx.showModal({
            title: `获取${name}失败`,
            content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
            confirmText: '去设置',
            confirmColor: '#FA550F',
            cancelColor: '取消',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(settinRes) {
                    // @ts-expect-error ignore this line
                    if (settinRes.authSetting[code] === true) {
                      resolve()
                    }
                    else {
                      console.warn('用户未打开权限', name, code)
                      reject(new Error('用户未打开权限'))
                    }
                  },
                })
              }
              else {
                reject(new Error('用户未打开权限'))
              }
            },
            fail() {
              reject(new Error('用户未打开权限'))
            },
          })
        }
        else {
          resolve()
        }
      },
      fail() {
        reject(new Error('用户未打开权限'))
      },
    })
  })
}
