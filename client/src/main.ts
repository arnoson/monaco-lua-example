import { MonacoServices } from '@codingame/monaco-languageclient'
import * as monaco from 'monaco-editor-core'
import editorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker'
import { connectLanguageServer } from './connectLanguageServer'
import { registerLanguage } from './registerLanguage'
;(self as any).MonacoEnvironment = {
  getWorker: () => new editorWorker(),
}

// If you change the port, make sure to also change it for the server!
const port = 8080

MonacoServices.install(monaco)
registerLanguage()
const protocol = location.protocol === 'https:' ? 'wss' : 'ws'
connectLanguageServer(`${protocol}://${location.hostname}:${port}`)

monaco.editor.create(document.querySelector('#editor-container')!, {
  model: monaco.editor.createModel(`print('hello!')`, 'lua'),
  theme: 'vs-dark',
  glyphMargin: true,
  minimap: { enabled: false },
})

// Optionally we can also add an additional lua file that contains API headers
// and global function and variable definitions. These will also show up in the
// autocompletion!
monaco.editor.createModel(
  `
---@class Apple
---@field color string

--- A Global Function
---@param num number
function GlobalFunction(num) end
`,
  'lua'
)
