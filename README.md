# Neat

**Neat** is a template repository, which helps to rapidly initialize and build frontend, backend and mobile apps using Neattech's technology stack.

### Configuring SSH

To generate **SSH** and connect it to **GitHub** use instruction [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

Establish connection to github

```
ssh -T git@github.com
```

### Installation

To install or update `neat` cli tooling use:

```bash
yarn global add ssh://git@github.com:neattech-io/neat#master

# success Installed "@neat/frontend@X.X.X" with binaries:
#      - neat
#      - neat-frontend
```

### Frontend

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

### Mobile

To initialize mobile application use:

```bash
neat mobile init --name <name>
```

### Webpack additional options

Neat provides an ability to modify webpack's configuration. In order to do that:

1. Create `webpack.neat.js` file in root of your project

2. Export ES5 function, which accepts webpack configuration and returns the updated one:

```
module.exports = (config) => {
  // const newConfig = { ...config, ... }
  return newConfig;
}
```

### Development instructions

To improve development experience, you need clone repository and then enter the following commands in terminal:

```bash
yarn install
yarn link
cd templates/frontend
yarn install
yarn link @neat/frontend
```

Now you can change neat-cli and test it running templates/frontend project
