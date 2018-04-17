# nuxt-global-base-components
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-global-base-components/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-global-base-components)
[![npm](https://img.shields.io/npm/dt/nuxt-global-base-components.svg?style=flat-square)](https://npmjs.com/package/nuxt-global-base-components)
[![CircleCI](https://img.shields.io/circleci/project/github/DaxChen/nuxt-global-base-components.svg?style=flat-square)](https://circleci.com/gh/DaxChen/nuxt-global-base-components)
[![Codecov](https://img.shields.io/codecov/c/github/DaxChen/nuxt-global-base-components.svg?style=flat-square)](https://codecov.io/gh/DaxChen/nuxt-global-base-components)
[![Dependencies](https://david-dm.org/DaxChen/nuxt-global-base-components/status.svg?style=flat-square)](https://david-dm.org/DaxChen/nuxt-global-base-components)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Register all BaseComponents globally in the components directory.

[📖 **Release Notes**](./CHANGELOG.md)

## Features

In the [Vue official style guide, there's a section about Base component names](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended), where base component should have names all begin with a specific prefix, such as `Base`, `App`, `V`, and mentioned a way for webpack users to register all these components globally.

Also, in [@chrisvfritz](https://github.com/chrisvfritz)'s awesome talk [7 Secret Patterns Vue Consultants Don’t Want You to Know](https://youtu.be/7lpemgMhi0k?t=6m7s), he explained this technique in detail, too!

So, this module does just that with nuxt!

## Installation

1. Add `nuxt-global-base-components` dependency using yarn or npm to your project

```sh
npm install --save nuxt-global-base-components
# or
yarn add nuxt-global-base-components
```

2. Add `nuxt-global-base-components` to `modules` section of `nuxt.config.js`

```js
// nuxt.config.js
module.exports = {
  modules: [
    // Simple usage
    'nuxt-global-base-components',

    // With options (see options below)
    ['nuxt-global-base-components', { recursive: true }],

    // see more useage examples below in the ## Usage Examples section
 ]
}
```

## Usage Examples

### With default inline options
```js
// nuxt.config.js
module.exports = {
  modules: [
    // some other modules...
    ['nuxt-global-base-components', {
      componentsPath: '~/components',
      recursive: false,
      regex: /^Base[A-Z].+\.(vue|jsx?)$/
    }]
  ]
}
```

### With top level options which searches subdirectories recursively
```js
// nuxt.config.js
module.exports = {
  modules: [
    // some other modules...
    'nuxt-global-base-components'
  ],
  globalBaseComponents: {
    recursive: true
  }
}
```

### With top level options to only includes `.vue` files and `App` prefix

Only include `.vue` extensions, so `AppButton.js` or `AppButton.jsx` won't be included.

```js
// nuxt.config.js
module.exports = {
  modules: [
    // some other modules...
    'nuxt-global-base-components'
  ],
  globalBaseComponents: {
    regex: /^App[A-Z].+\.vue/
  }
}
```

## Options

Currently, there are three options (and there default values):

```js
const defaultOptions = {
  recursive: false,
  regex: /^Base[A-Z].+\.(vue|jsx?)$/,
  componentsPath: '~/components'
}
```

And these options are passed to wepack's [require.context](https://webpack.js.org/guides/dependency-management/#require-context). For the default example:

```js
const requireComponent = require.context(
  '~/components', // directory to search
  false, // whether subdirectories should be searched too
  /^Base[A-Z].+\.(vue|jsx?)$/ // regular expression to match files against
)
```

### `recursive`
**type**: `Boolean`
**default**: `false`

Indicates whether subdirectories should be searched recursively.

For example, if `recursive: false`, `~/components/BaseButton.vue` will be included, but `~/components/nested/BaseButton.vue` won't;
and if `recursive: true`, all `~/components/BaseButton.vue`, `~/components/nested/BaseButton.vue`, `~/components/deeply/nested/BaseButton.vue`, etc. will be included.

Turn this to true if you have BaseComponents in nested directories.

### `regex`
**type**: `Regex`
**default**: `/^Base[A-Z].+\.(vue|jsx?)$/`

A regular expression to match files against.

The default regex `/^Base[A-Z].+\.(vue|jsx?)$/` matches all files starting with `Base` (followed by a capital letter, because PascalCase), and ends with `.vue`, `.js` or `.jsx` extension.

If you have a different prefix for global components, for example `App`, you can use `/^App[A-Z].+\.(vue|jsx?)$/`.

Here are some examples:

 - `/^Base[A-Z].+\.vue$/`: Matches all `.vue` files with `Base` prefix.
 - `/^App[A-Z].+\.(vue|js)$/`: Matches `.vue` or `.js` files with `App` prefix.
 - `/^V[A-Z].+\.(vue|jsx?)$/`: Matches `.vue`, `.js` or `.jsx` files with `V` prefix.
 - `/^Base[A-Z]/`: Matches any file extension with `Base` prefix.


### `componentsPath`
**type**: `String`
**default**: `'~/components'`

A directory for webpack to search. The default is `'~/components'`, which is probably the case for nuxt projects. Change it if you put your BaseComponents somewhere else.

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) DaxChen <dd@daxchen.com>
