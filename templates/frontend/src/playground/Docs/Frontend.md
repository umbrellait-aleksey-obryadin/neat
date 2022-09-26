To initialize frontend repository use:

```bash
neat frontend init --name <name>
```

`<name>` - name of new repository

Also you can add sentry dsn on initialization (optional):

```bash
neat frontend init --name <name> -s, --sentry <dsn>
```

`<dsn>` - sentry dsn URL (view Settings -> Projects -> Client Keys (DSN) in sentry.io)

Example:

```bash
neat frontend init --name MyProjectName --sentry 123sj24
```

The created repository includes:

- `start` and `build` webpack commands
- `lint` and `lint:fix` commands
- configured typescript
- configured eslint and prettier
- configured neattech's i18n loader
- husky with pre-commit hook for eslint, prettier, typescript
- support for multiple webpack entrypoints

### Development instructions

To improve development experience, you need clone repository and then enter the following commands in terminal:

```bash
yarn install
yarn link
cd templates/frontend
yarn install
yarn link @neat/frontend
```

### Webpack additional options

Neat provides an ability to modify webpack's configuration. In order to do that:

1. Create `webpack.neat.js` file in root of your project

2. Export ES5 function, which accepts webpack configuration and returns the updated one:

```ts
module.exports = (config) => {
  // const newConfig = { ...config, ... }
  return newConfig
}
```
