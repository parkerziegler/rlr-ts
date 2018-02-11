## rlr-ts
> An example app using v15.0.0 of Formidable Labs' `redux-little-router` with TypeScript

This repository provides an example using `redux-little-router` with TypeScript, and supports a pull request for adding type definitions directly to the library. If you're using this repository while the pull request is under review, take the following steps to try it out:

1. Clone my `redux-little-router` fork and checkout the `typescript-defs` branch. **The pull request is made from this branch.** You can find the branch [here](https://github.com/parkerziegler/redux-little-router/tree/feature/typescript-defs). Alternatively, clone the fork and use `git fetch` to get all branches. Then `git checkout typescript-defs`.
2. Run `yarn` or `npm install` to install dependencies. Create `es` and `lib` builds by running `yarn run build` or `npm run build`. Finally, _symlink_ the repo by running either `yarn link` or `npm link`.
3. Clone this repo **into the same directory**. Install dependencies with `yarn`. Finally, symlink this repository to your local clone of `redux-little-router` (steps 1 and 2 above) by running `yarn link redux-little-router` or `npm link redux-little-router`.
4. Run `yarn run start:dev` or `npm run start:dev` to start `webpack-dev-server` at `localhost:8080`. You should be good to go! You can also use `webpack` command to create a `bundle.js` file in the `dist` folder.

Some of the styles are a bit off from what the original `redux-little-router` includes. This is a result of my laziness and lack of desire to setup appropriate CSS modules loaders for TypeScript. I;ve wrestled with the compiler enough times to know when I've hit the limit.

Currently this repository uses TypeScript 2.4.2. A demo for server-side routing will be forthcoming.