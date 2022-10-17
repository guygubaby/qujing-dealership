import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'

const include = [/\.wxml$/]

export default defineConfig(
  {
    include,
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
    },
    presets: [
      presetWeapp({
        dark: 'class',
      }),

      presetIcons({
        prefix: 'i-',
        warn: true,
        autoInstall: false,
      }),
    ],

    rules: [
      [/^([w|h])-(\d+)$/, (match) => {
        const [c, p, d] = match
        const unit = p === 'w' ? 'width' : 'height'
        const val = isNaN(+d) ? d : `${+d * 8}rpx`
        return `.${c}{${unit}:${val};}`
      }],
      [
        /^(?:grid)-(row|col)-(.+)$/, (match) => {
          const [c, p, d] = match
          const unit = p === 'col' ? 'columns' : 'rows'
          const val = isNaN(+d) ? d : `repeat(${d}, minmax(0,1fr))`
          return `.${c}{grid-template-${unit}:${val};}`
        },
      ],
    ],

    transformers: [
      transformerDirectives(),

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
