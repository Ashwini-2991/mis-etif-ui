# Angular Starter App

-   [Angular CLI](#Angular-CLI)
-   [Project Structure](#Project-Structure)
-   [Starter App Features](#Starter-App-Features)

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

## Project Structure

The directory structure included in this project utilizes the following convention:

### Core

`src/app/core`

The CoreModule contains dependencies that should only be imported in the project once in the root module. The CoreModule class implements a ["for-root pattern"](https://angular.io/guide/singleton-services#the-forroot-pattern) and an error will be thrown if it is imported in multiple locations.

### Shared

`src/app/shared`

The SharedModule is intended to aggregate dependencies that are commonly used across your app. This module can safely be imported in multiple places and helps to simplify/reduce the import declarations needed within feature modules, route modules, etc.

This is where you can place shared directives, pipes, services, models and types. It is unlikely that you will need to declare components in the SharedModule as components typically belong in the feature domains themselves and are composed within their own respective feature domains.

### Repository

`src/app/repository`

The repository directory contains all services responsible for interacting with external data sources. This includes REST api integrations, local storage, file system, etc.

Your feature and route modules will commonly utilize these repository services in their own respective services. This avoids redundancies across features/routes who may be interacting with the same external resources.

It's a good idea to define types in the `src/app/repository/types` directory that define the shape of your various data sources. For example, a json payload returned by a REST api should have a corresponding type that defines the json payload. Since json only deals with primitives (numbers and strings), your type should only define properties as primitives. In other words, only describe the resource as it actually is, not what your app will eventually turn it into.

### Domain Modules

`src/app/[domain module name]`

Follow the [Angular documentation for guidelines for creating NgModules](https://angular.io/guide/module-types#guidelines-for-creating-ngmodules)

As a general rule, the majority of our features will be organized into Routed Domain modules that are lazy loaded.

### Directory Structure

-   📁 src/
    -   📁 app/
        -   📁 core/
            -   core.module.ts
            -   📁 [core-feature-name]/
                -   [core-feature-name].module.ts
                -   [core-feature-name].component.ts
        -   📁 repository/
            -   📁 services/
                -   [repository-name].service.ts
            -   📁 types/
                -   [repository-type].ts
        -   📁 shared/
            -   shared.modules.ts ([Shared Module](https://angular.io/guide/module-types#shared-ngmodules))
            -   📁 directives/
            -   📁 pipes/
            -   📁 services/
            -   📁 models/
            -   📁 types/
        -   📁 customers/ (customers is an example domain module)
            -   customers.module.ts ([Domain Module](https://angular.io/guide/module-types#domain-ngmodules))
            -   customers-routing.module.ts ([Routing Module](https://angular.io/guide/module-types#routing-ngmodules))
            -   📁 components
            -   📁 containers
            -   📁 directives
            -   📁 resolvers
            -   📁 services
            -   📁 pipes
            -   📁 mappers
            -   📁 types
        -   📁 styles/
            -   [module].scss
        -   app.component.html
        -   app.component.ts
        -   app.module.ts
        -   app-routing.module.ts
        -   main.ts
        -   polyfills.ts
        -   styles.scss

---

## Starter App Features

### Lazy-Loaded Routes

The routes in this project are configured to be lazy-loaded. All root app routes are configured in `src/app/routes/routes.module.ts`.

For additional information on lazy loading in Angular/Webpack, please see the [documentation](https://angular.io/guide/lazy-loading-ngmodules).

### Blue Framework

Moody's Blue framework dependencies are included.

### Blue Styles

-   [@moodys/blue-syles](https://mdpgit-live.app.mis.tld/projects/UI/repos/blue-styles) - Shared style library

### Blue Ng

-   [@moodys/blue-ng](https://mdpgit-live.app.mis.tld/projects/UI/repos/blue-ng) - Angular component library

### Linting and Formatting

ESLint and Prettier configurations are included.

This project includes `typescript-eslint` and required dependencies for linting/fixing typescript. All configurations are managed in the `.eslintrc.json` file in the root directory.

For formatting css and html, [prettier](https://github.com/prettier/prettier) and the [prettier-eslint](https://github.com/prettier/prettier-eslint) plugin has also been included/configured. All prettier configs are managed in `.prettierrc.json` in the root directory.

To lint your code, run:

```
npm run lint
```

To lint and fix any auto-fixable issues, run:

```
npm run lint:fix
```

To format all project files using prettier, run:

```
npm run format
```

> ⚠️ It is strongly encouraged to enable ESlint and the Prettier formatter in your preferred IDE/editor.

> ⚠️ You should configure your CI pipeline to run eslint as a required step before code is built/merged.

### Testing

The starter app includes several commands to assist you in testing your application.

This will run your test suite, as well as spin up your coverage report using a local http server which enables hot reloads.

```
npm test
```

This will run a local http server which will serve only your coverage report.

```
npm run test:coverage
```

This will run your tests, in a headless mode, which is how you should run them in your CI process.

```
npm run test:ci
```

### Building Your Application

There are two build commands included with the starter app.

To be used for lower environments because it includes source maps and does not minify/obfuscate your code.

```
npm run build:dev
```

To be used for production deployments.

```
npm run build:prod
```

### Analyzing Your Application

The starter app includes a npm package called `webpack-bundle-analyzer`. This is useful for analyzing your bundle sizes, as well as exploring the bundles you will deliver to the client in order to make sure you arent shipping code that you do not intend to ship.

```
npm run stats
```

If you want to just build your stats report

```
npm run stats:build
```

If you want to just run the analyzer

```
npm run stats:analyze
```

### Husky

The starter app also includes Husky, a npm package which enables pre-commit/pre-push hooks. In the starter app we use this to enforce linting rules pre-commit. This is what the

```
npm run prepare
```

does. In the root of this project, you will find a .husky folder. Within that folder there is a pre-commit file where you can run any npm commands you want that will execute before a commit is added.
