# mocha-react-templates-compiler

react-templates compiler for mocha test framework.

## Install

```sh
npm install --save-dev mocha-react-templates-compiler
```

## Use

```sh
mocha --compilers rt:mocha-react-templates-compiler
```

You can use different values for react-templates' `module` flag by:

```sh
mocha --compilers rt:mocha-react-templates-compiler/dist/{amd,commonjs,es6}
```

Defaults to `es6`.

## Changelog

### 2.1.1

* Updated to work with the latest `react-template` version.

### 2.1.0

* Important bugfixes.

### 2.0.0

* Adds the possibility of using different `modules` flag for react-templates.

* Updates dependencies. It now depends on `react-templates@^0.4.0`,
  `babel-core@^6.0.0` and `babel-preset-es2015@^6.0.0`.

### 1.0.0

* Initial release :tada:

enjoy
