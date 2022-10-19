import { resolve } from 'path'
import { Parser } from 'htmlparser2'
import { readFile, readdir, writeFile } from 'fs-extra'
import type MagicString from 'magic-string'
import { dim, red } from 'colorette'
import type { SourceCodeTransformer } from 'unocss'

// TODO: remove `htmlparser2`, use `magic-string` to find vant components instead

interface Context {
  ready: boolean
  avaliableComponents: string[]
  parsedFiles: Set<string>
  componentMap: Record<string, string[]>
}

const cwd = process.cwd()

const shorttenPath = (path: string) => {
  return path.replace(cwd, '')
}

const isArrayEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length)
    return false

  return a.every(item => b.includes(item))
}

const ctx: Context = {
  ready: false,
  avaliableComponents: [],
  parsedFiles: new Set(),
  componentMap: {},
}

export const preflight = async () => {
  if (ctx.ready)
    return

  const vantLibPath = 'miniprogram/miniprogram_npm/@vant/weapp'
  const vantPath = resolve(cwd, vantLibPath)
  const files = await readdir(vantPath)

  ctx.avaliableComponents = files
  ctx.ready = true
}

const getVantComponentsFromRawCode = (code: MagicString, id: string) => {
  const components: string[] = []

  if (!ctx.avaliableComponents.length) {
    console.log(red('vant-auto-import: preflight not ready'))
    return components
  }

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

  parser.write(code.toString())
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
}

const processWxml = async (code: MagicString, id: string) => {
  if (ctx.parsedFiles.has(id) && !code.hasChanged())
    return

  ctx.parsedFiles.add(id)

  const components = getVantComponentsFromRawCode(code, id)

  const oldComponents = ctx.componentMap[id] || []

  if (isArrayEqual(components, oldComponents))
    return

  ctx.componentMap[id] = components

  try {
    await writeJson(id, components)
  }
  catch (error) {
    console.log(red('write json failed'))
  }
}

export const autoImportVantTransformer = (): SourceCodeTransformer => {
  return {
    name: 'auto-import-vant',
    enforce: 'pre',
    idFilter: id => id.endsWith('.wxml'),
    async transform(code, id) {
      await preflight()
      await processWxml(code, id)
    },
  }
}
