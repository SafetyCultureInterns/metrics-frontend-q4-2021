# Getting Started with the Metrics Frontend

You'll want to make sure you have some dependencies installed before going any further.
- Install [NVM](https://github.com/nvm-sh/nvm), Node Version Manager. nvm lets you manage your node installations.
- Once you have installed node -v 16 using nvm, Install [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
- Now open this repository in your IDE of choice. The teams here use both [Visual studio](https://visualstudio.microsoft.com/) and [Webstorm](https://www.jetbrains.com/webstorm/promo/?source=google&medium=cpc&campaign=9641686248&gclid=Cj0KCQiAys2MBhDOARIsAFf1D1fG5A-zccLns7p_Z6KULNvRZs4x577quVhkPwzE8xrzqTtq1M96TVcaAvSuEALw_wcB)
- You should be able to run `yarn install` which will install all of your dependencies needed to build and run the application
- If you run into any issues during the installation, feel free to reach out to anyone on the team for help

## Template

This repo is losely based off of the tuturial found [Here](https://medium.com/geekculture/react-js-architecture-features-folder-structure-design-pattern-70b7b9103f22). \
If you have some time or get lost, I would highly recommend reading it.

## Dependencies
- We are using axios to make requests to backend services. More information on making requests with axios can be found [Here](https://www.digitalocean.com/community/tutorials/react-axios-react)
- We use react-router-dom to navigate around within our application. [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
- We use material UI for their pre-made components [Material ui](https://mui.com/styles/basics/#styled-components-api)
- We are using react styled components from. [Styled Components](https://styled-components.com/)
- We use React-Redux for our state management. (Keeping data in local memory) [React-redux](https://react-redux.js.org/)

Disclaimer: You don't have to use any of these dependencies, they are just what we have used to get started. Feel free to find your own libraries.
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
