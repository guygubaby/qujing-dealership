import { defineConfig, presetIcons } from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'

const include = [/\.wxml$/]

export default defineConfig(
  {
    include,
    presets: [
      presetWeapp({
        dark: 'class',
      }),

      presetIcons({
        prefix: 'i-',
      }),
    ],

    rules: [
      [/^([w|h])-(.+)$/, (match) => {
        const [c, p, d] = match
        const unit = p === 'w' ? 'width' : 'height'
        const val = isNaN(+d) ? d : `${+d * 8}rpx`
        return `.${c}{${unit}:${val}}`
      }],
    ],

    transformers: [
      transformerClass({
        include,
        transformRules: {
          '.': '.',
          '/': '-s-',
          ':': '-c-',
          '%': '-p-',
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
