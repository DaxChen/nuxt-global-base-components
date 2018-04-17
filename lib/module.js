const { resolve } = require('path')

module.exports = function module (moduleOptions) {
  const defaultOptions = {
    recursive: false,
    regex: /^(\.\/.+)*Base[A-Z].+\.(vue|jsx?)$/,
    componentsPath: '~/components'
  }
  const options = Object.assign(
    defaultOptions,
    this.options.globalBaseComponents,
    moduleOptions
  )

  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'nuxt-global-base-components.js',
    options
  })
}
