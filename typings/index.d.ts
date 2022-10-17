/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    StatusBar: number,
    CustomBar: number,
    Custom?: WechatMiniprogram.ClientRect,
    navHeight: number
    navTop: number
    windowHeight: number
    menuButtonObject: Nullable<WechatMiniprogram.ClientRect>
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
