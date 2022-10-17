let systemWidth = 0

/** 获取系统宽度，为了减少启动消耗所以在函数里边做初始化 */
export const loadSystemWidth = () => {
  if (systemWidth)
    return systemWidth

  try {
    ({ screenWidth: systemWidth } = wx.getSystemInfoSync())
  }
  catch (e) {
    systemWidth = 0
  }
  return systemWidth
}

/**
 * 转换rpx为px
 *
 * @description
 * 什么时候用？
 * - 布局(width: 172rpx)已经写好, 某些组件只接受px作为style或者prop指定
 *
 */
export const rpx2px = (rpx: number, round = false) => {
  loadSystemWidth()

  // px / systemWidth = rpx / 750
  const result = (rpx * systemWidth) / 750

  if (round)
    return Math.floor(result)

  return result
}

/**
 * 手机号码*加密函数
 * @param {string} phone 电话号
 * @returns
 */
export const phoneEncryption = (phone: string) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 内置手机号正则字符串
const innerPhoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

/**
 * 手机号正则校验
 * @param phone 手机号
 * @returns true - 校验通过 false - 校验失败
 */
export const phoneRegCheck = (phone: string) => {
  const phoneRegExp = new RegExp(innerPhoneReg)
  return phoneRegExp.test(phone)
}
