import { throttle } from '@bryce-loskie/utils'

const app = getApp()

export const onPageScroll = throttle(16.7, function ({ scrollTop }: { scrollTop: number }) {
  const delta = scrollTop / app.globalData.navHeight
  const opacity = Math.min(delta, 1)

  if (opacity > 1)
    return

  // @ts-expect-error ignore this
  this.setData({
    navOpacity: opacity,
  })
})
