import Vue from 'vue'

// register all base components globally!!
const requireComponent = require.context(
  <% options.componentsPath %>,
  <% options.recursive %>,
  <% options.regex %>
)
requireComponent.keys().forEach(fileName => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  Vue.component(baseComponentName, baseComponentConfig)
})
