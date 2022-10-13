import type { Preflight } from 'unocss'
import { defineConfig, entriesToCss, presetUno } from 'unocss'
// import presetWeapp from 'unocss-preset-weapp'

const preflights: Preflight<any>[] = [
  {
    layer: 'preflights',
    getCSS(ctx) {
      if (ctx.theme.preflightBase) {
        const css = entriesToCss(Object.entries(ctx.theme.preflightBase))
        return `page,::before,::after{${css}}::backdrop{${css}}`
      }
      return undefined
    },
  },
]

export default defineConfig({
  postprocess(util) {
    const { selector } = util
    if (selector === '.container') {
      util.parent = undefined
      util.entries = []
    }
  },
  envMode: 'dev',
  shortcuts: [
    { box: 'max-w-7xl mx-auto bg-gray-100 rounded-md shadow-sm p-4' },
  ],
  presets: [
    { ...presetUno(), preflights },
    // presetWeapp(),
  ],
})
