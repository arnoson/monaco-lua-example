import { languages } from 'monaco-editor-core'
// @ts-ignore
import { language, conf } from 'monaco-editor/esm/vs/basic-languages/lua/lua.js'

export const registerLanguage = () => {
  languages.register({
    id: 'lua',
    extensions: ['.lua'],
    aliases: ['Lua', 'lua'],
  })
  languages.setMonarchTokensProvider('lua', language)
  languages.setLanguageConfiguration('lua', conf)
}
