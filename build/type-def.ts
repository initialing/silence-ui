import path from 'path'
import fs from 'fs/promises'
import * as vueCompiler from '@vue/compiler-sfc'
import { Project } from 'ts-morph'
import glob from 'fast-glob'
import { bold } from 'chalk'

import { green, red, yellow } from 'chalk'
import { distPath, pkgSiPath, pkgPath, rootPath } from '../path/path'

import { excludeFiles, pathRewriter } from './utils/tools'
import type { SourceFile } from 'ts-morph'

const TSCONFIG_PATH = path.resolve(rootPath, 'tsconfig.json')
const outDir = path.resolve(distPath, 'types')


export const genTypesDefinitions = async () => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: false,
      outDir,
      baseUrl: rootPath,
      paths: {
        '@silence-ui/*': ['packages/*'],
      },
      skipLibCheck: true,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const filePaths = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!silence-ui/**/*'], {
      cwd: pkgPath,
      absolute: true,
      onlyFiles: true,
    })
  )
  const epPaths = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgSiPath,
      onlyFiles: true,
    })
  )

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = ''
          let isTS = false
          if (script && script.content) {
            content += script.content
            if (script.lang === 'ts') isTS = true
          }
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
            if (scriptSetup.lang === 'ts') isTS = true
          }
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await fs.readFile(path.resolve(pkgSiPath, file), 'utf-8')
      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgPath, file), content)
      )
    }),
  ])

  const diagnostics = project.getPreEmitDiagnostics()
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  await project.emit({
    emitOnlyDtsFiles: true,
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    
    const relativePath = path.relative(pkgPath, sourceFile.getFilePath())
    console.log(yellow(`Generating definition for file: ${bold(relativePath)}`))

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      console.log(red(`Emit no file: ${bold(relativePath)}`))
      return
    }

    const tasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      })

      await fs.writeFile(
        filepath,
        pathRewriter('esm')(outputFile.getText()),
        'utf8'
      )

      console.log(green(`Definition for file: ${bold(relativePath)} generated`))
    })

    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}
