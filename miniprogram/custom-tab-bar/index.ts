import { ensurePrefix } from '@bryce-loskie/utils'
import type { ITabItem } from './data'
import TabMenu, { TabNameEnum } from './data'

interface IData {
  active: TabNameEnum
  list: ITabItem[]
}

Component<IData, {}, {}>({
  data: {
    active: TabNameEnum['used-car'],
    list: TabMenu,
  },

  methods: {
    onChange(event: any) {
      const name: TabNameEnum = event.detail
      this.setData({ active: name })

      const tab = this.data.list.find(item => item.name === name)
      if (!tab)
        return

      const url = ensurePrefix(tab.pagePath, '/')
      wx.switchTab({ url })
    },

    init() {
      const page = getCurrentPages().pop()
      const route = page ? page.route.split('?')[0] : ''
      const tab = this.data.list.find(
        item =>
          (item.pagePath.startsWith('/') ? item.pagePath.substr(1) : item.pagePath)
          === `${route}`,
      )
      if (!tab)
        return
      const active = tab.name
      this.setData({ active })
    },
  },
})
