# sbproot

This project leverages the following:

Trigger a CI Build test. 

* Node  vr 10.15.3 -- required version.
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.
* [NGRX](https://github.com/ngrx/platform) for state management.
* [JWT](https://jwt.io/) based authentication.
* Using [NGRX](https://github.com/ngrx/platform) store selectors in an HTTP request interceptor to automatically add the auth token to request headers.
* Protected Angular routes using [Route Guards](https://angular.io/guide/router#milestone-5-route-guards) that determine if the user is authenticated via [NGRX](https://github.com/ngrx/platform) selectors.

## Quick Start

* Clone the Ordering app UI: `git clone TODO/sbproot.git`
* Install the app’s dependencies: `cd ordering-ui && npm install`
* Build and run the app locally: `npm run dev`
* Open browser with URL [http://localhost:4400/](http://localhost:4400/)
* The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Prod Build

Run `npm run prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Pre-Commit and Pre-Push Git Hooks with Husky

**Overview**

**NOTE**: In order for this to work for all devs you **_MUST_** perform the following tasks in order:

* Ensure you're running Node  vr 10.15.3.
* Delete directory `node_modules`.
* Delete all content from `.git/hooks` folder in project root.
* Run `npm i`.
* Make a minor code change that requires formatting like moving a `{` to a new line or removing a semi-colon.
* Commit.
* Push.

To validate devs should see their code formatted with a fix applied to their minor code change frm above and the commit and push should succeed.

**Troubleshooting**

When you perform the `npm i` above you should see something like the following in your console:

```
Brians-MacBook-Pro-2017:sbroot-tim brianmriley$ npm i

> fsevents@1.2.9 install /Users/brianmriley/projects/mdl/projects/soft-bank/tech/sbroot-tim/node_modules/fsevents
> node install

node-pre-gyp WARN Using request for node-pre-gyp https download 
[fsevents] Success: "/Users/brianmriley/projects/mdl/projects/soft-bank/tech/sbroot-tim/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

> node-sass@4.12.0 install /Users/brianmriley/projects/mdl/projects/soft-bank/tech/sbroot-tim/node_modules/node-sass
> node scripts/install.js

Cached binary found at /Users/brianmriley/.npm/node-sass/4.12.0/darwin-x64-64_binding.node

> husky@2.3.0 install /Users/brianmriley/projects/mdl/projects/soft-bank/tech/sbroot-tim/node_modules/husky
> node husky install

husky > Setting up git hooks
husky > Done
husky > Like husky? You can support the project on Patreon:
husky > https://www.patreon.com/typicode ❤

> node-sass@4.12.0 postinstall /Users/brianmriley/projects/mdl/projects/soft-bank/tech/sbroot-tim/node_modules/node-sass
> node scripts/build.js

Binary found at /Users/brianmriley/projects/mdl/projects/soft-bank/tech/sbroot-tim/node_modules/node-sass/vendor/darwin-x64-64/binding.node
Testing binary
Binary is fine
added 1470 packages from 1147 contributors and audited 45111 packages in 18.486s
found 2 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
```

The important details here are seeing `node-sass@4.12.0 install` correctly as well as the installation of the Husky hook >> husky > `Setting up git hooks, husky > Done`.

If you don't see this in the console logs try again from the top of these instructions.

