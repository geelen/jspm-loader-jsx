const BUILD_MODE = typeof window === 'undefined'

import ReactMount from 'react/lib/ReactMount'
import reactHotApi from 'react-hot-api'
import path from 'path'
import pascalCase from 'pascal-case'

let classNameFromFilename = ( filename ) => {
  return pascalCase( path.basename( filename, path.extname( filename ) ) )
}
let reexportHotVersionSnippet = ( className ) => `
  import __React from 'react'
  import __ReactMount from 'react/lib/ReactMount'
  import __reactHotApi from 'github:gaearon/react-hot-api@0.4.3'
  if (typeof ${className} !== "undefined" && ${className}.prototype instanceof __React.Component) {
    if (!window.__jsxHot) window.__jsxHot = {}
    if (!__jsxHot.${className}) __jsxHot.${className} = __reactHotApi(_ => __ReactMount._instancesByReactRootID)
    let hotted = __jsxHot.${className}(${className})
    __hotReload = () => false
  } else {
    __hotReload = true
  }
`

export let translate = load => {
  let snippet = BUILD_MODE ? '' : reexportHotVersionSnippet( classNameFromFilename( load.metadata.pluginArgument ) );
  load.source = `export let __hotReload; ${load.source} ${snippet}`;
}

export let hotReload = module => {
  // Noop here either. This only runs on the updated modules, not on
  // the first one, and the react-hot-reloader needs to be injected
  // from the very beginning.
}
