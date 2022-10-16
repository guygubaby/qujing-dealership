import { resolve } from 'path'
import { Parser } from 'htmlparser2'
import { readFile, readdir, writeFile } from 'fs-extra'
import fg from 'fast-glob'
import { debounce } from 'perfect-debounce'
import { cyan, dim, green, red, yellow } from 'colorette'
import { toArray } from '@bryce-loskie/utils'

interface Context {
  patterns: string[] | string
  avaliableComponents: string[]
  componentMap: Record<string, string[]>
}

const cwd = process.cwd()

const shorttenPath = (path: string) => {
  return path.replace(cwd, '')
}

const ctx: Context = {
  patterns: 'miniprogram/pages/**/*.wxml',
  avaliableComponents: [],
  componentMap: {},
}

const getVantComponentsFromRawHtml = (rawHtml: string, id: string) => {
  const components: string[] = []

  const parser = new Parser({
    onopentag(name, _attribs, isImplied) {
      if (isImplied)
        return

      if (!name.startsWith('van-'))
        return

      const componentName = name.replace(/^van-/, '')

      if (!ctx.avaliableComponents.includes(componentName))
        return console.log(dim('unknown vant component'), red(name), dim(`found in ${shorttenPath(id)}`))

      if (!components.includes(name))
        components.push(name)
    },

    onerror(error) {
      console.error(red('parse failed'), error)
    },
  })

  parser.write(rawHtml)
  parser.end()

  return components
}

const getComponentPath = (componentName: string) => {
  return `@vant/weapp/${componentName.replace(/^van-/, '')}/index`
}

const writeJson = async (id: string, components: string[]) => {
  const jsonPath = id.replace(/\.wxml$/, '.json')
  const json = await readFile(jsonPath, 'utf-8')
  const jsonObj = JSON.parse(json)
  const { usingComponents = {} } = jsonObj

  Object.keys(usingComponents).forEach((key) => {
    if (key.startsWith('van-'))
      delete usingComponents[key]
  })

  components.forEach((component) => {
    usingComponents[component] = getComponentPath(component)
  })

  jsonObj.usingComponents = usingComponents
  const newJson = `${JSON.stringify(jsonObj, null, 2)}\n`
  await writeFile(jsonPath, newJson)

  console.log(cyan('apply usingComponents for'), dim(shorttenPath(id)))
}

const init = async () => {
  const vantLibPath = 'miniprogram/miniprogram_npm/@vant/weapp'
  const vantPath = resolve(cwd, vantLibPath)
  const files = await readdir(vantPath)

  ctx.avaliableComponents = files
}

const isArrayEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length)
    return false

  return a.every(item => b.includes(item))
}

const processWxml = async (file: string) => {
  const start = Date.now()

  const { componentMap } = ctx
  const oldComponents = componentMap[file] || []

  const raw = await readFile(file, 'utf-8')
  const components = getVantComponentsFromRawHtml(raw, file)

  if (isArrayEqual(oldComponents, components))
    return

  componentMap[file] = components
  await writeJson(file, components)

  console.log(
    green('in'),
    yellow(`${Date.now() - start}ms`),
  )
}

const preProcess = async () => {
  const { patterns } = ctx
  const files = await fg(patterns, { cwd, absolute: true })
  await Promise.all(files.map(processWxml))
}

const startWatcher = async () => {
  const { watch } = await import('chokidar')
  const { patterns } = ctx
  const ignored = ['**/{.git,node_modules}/**']

  const watcher = watch(patterns, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored,
    cwd,
  })

  const debouncedProcessWxml = debounce(async (id: string) => {
    await processWxml(id)
  }, 120)

  watcher.on('all', async (type, file) => {
    if (!['add', 'change'].includes(type))
      return

    console.log(`\ndetect ${green(type)} ${dim(file)}`)

    const absolutePath = resolve(cwd, file)
    await debouncedProcessWxml(absolutePath)
  })

  console.info(
    `\nWatching for changes in ${
      toArray(patterns)
        .map(i => cyan(i))
        .join(', ')}`,
  )
}

const boostrap = async () => {
  console.log(cyan('🚀  Auto Import Vant Components \n'))

  await init()
  await preProcess()
  await startWatcher()
}

boostrap().catch(console.error)
