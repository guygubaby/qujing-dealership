import { defineConfig, presetIcons } from 'unocss'
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
      [
        /^([w|h])-(\d+)$/, (match) => {
          const [c, p, d] = match
          const unit = p === 'w' ? 'width' : 'height'
          const val = isNaN(+d) ? d : `${+d * 8}rpx`
          return `.${c}{${unit}:${val};}`
        },
      ],
      [
        /^(?:grid)-(row|col)-(.+)$/, (match) => {
          const [c, p, d] = match
          const unit = p === 'col' ? 'columns' : 'rows'
          const val = isNaN(+d) ? d : `repeat(${d}, minmax(0,1fr))`
          return `.${c}{grid-template-${unit}:${val};}`
        },
      ],
      [
        /^(?:snap)-(x|y|center|start)$/, (match) => {
          const [c] = match
          const dict: Record<string, string> = {
            'snap-x': 'scroll-snap-type: x mandatory;',
            'snap-y': 'scroll-snap-type: y mandatory;',
            'snap-start': 'scroll-snap-align: start;',
            'snap-center': 'scroll-snap-align: center;',
            'snap-end': 'scroll-snap-align: end;',
          }
          const val = dict[c] || ''
          return `.${c}{${val}}`
        },
      ],
    ],

    transformers: [
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
