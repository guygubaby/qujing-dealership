import { throttle } from '@bryce-loskie/utils'

export const onPageScroll = throttle(32, function ({ scrollTop }: { scrollTop: number }) {
  const delta = scrollTop / this.data.navHeight
  const opacity = Math.min(delta, 1)
  if (opacity === 1)
    return
  this.setData({
    navOpacity: opacity,
  })
})
