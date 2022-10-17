export enum TabNameEnum {
  'used-car' = 'used-car',
  'rent-car' = 'rent-car',
  'collection' = 'collection',
  'mine' = 'mine',
}

export interface ITabItem {
  text: string
  iconPath: string
  selectedIconPath: string
  pagePath: string
  name: TabNameEnum
}

const tabList: ITabItem[] = [
  {
    text: '二手车',
    name: TabNameEnum['used-car'],
    pagePath: 'pages/used-car/index',
    iconPath: '/image/tab-icons/used-car.png',
    selectedIconPath: '/image/tab-icons/used-car-active.png',
  },
  {
    text: '租车',
    name: TabNameEnum['rent-car'],
    pagePath: 'pages/rent-car/index',
    iconPath: '/image/tab-icons/rent-car.png',
    selectedIconPath: '/image/tab-icons/rent-car-active.png',
  },
  {
    text: '收藏',
    name: TabNameEnum.collection,
    pagePath: 'pages/collection/index',
    iconPath: '/image/tab-icons/collection.png',
    selectedIconPath: '/image/tab-icons/collection-active.png',
  },
  {
    text: '我的',
    name: TabNameEnum.mine,
    pagePath: 'pages/mine/index',
    iconPath: '/image/tab-icons/mine.png',
    selectedIconPath: '/image/tab-icons/mine-active.png',
  },
]

export default tabList
