import { throttle } from '@bryce-loskie/utils'

export const onPageScroll = throttle(16, function ({ scrollTop }: { scrollTop: number }) {
  // @ts-expect-error ignore this
  const delta = scrollTop / this.data.navHeight
  const opacity = Math.min(delta, 1)
  if (opacity === 1)
    return

  // @ts-expect-error ignore this
  this.setData({
    navOpacity: opacity,
  })
})
