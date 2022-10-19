import { defineConfig, presetIcons, presetUno } from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'
import { autoImportVantTransformer } from './vant-auto-import'

const weappPreset = presetWeapp({
  dark: 'class',
})

const include = [/\.wxml$/]

export default defineConfig(
  {
    include,
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
    },

    presets: [
      weappPreset,

      { ...presetUno(), preflights: weappPreset.preflights },

      presetIcons({
        prefix: 'i-',
        scale: 1.2,
        warn: true,
      }),
    ],

    rules: [
      // [
      //   /^([w|h])-(\d+)$/, (match) => {
      //     const [c, p, d] = match
      //     const unit = p === 'w' ? 'width' : 'height'
      //     const val = isNaN(+d) ? d : `${+d * 8}rpx`
      //     return `.${c}{${unit}:${val};}`
      //   },
      // ],
      // [
      //   /^(?:grid)-(row|col)-(.+)$/, (match) => {
      //     const [c, p, d] = match
      //     const unit = p === 'col' ? 'columns' : 'rows'
      //     const val = isNaN(+d) ? d : `repeat(${d}, minmax(0,1fr))`
      //     return `.${c}{grid-template-${unit}:${val};}`
      //   },
      // ],
    ],

    transformers: [
      autoImportVantTransformer(),

      transformerClass({
        include,
        transformRules: {
          '.': '.',
          '/': '-s-',
          ':': '-c-',
          '!': '-e-',
          '#': '-w-',
          '(': '-bl-',
          ')': '-br-',
          '[': '-fl-',
          ']': '-fr-',
          '$': '-r-',
        },
      }),
    ],
  },
)
