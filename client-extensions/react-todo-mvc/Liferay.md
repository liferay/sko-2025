# Liferay Client Extension Modifications

This file contains the details about changes made to convert the original code from (Todo MVC React Example)[https://github.com/tastejs/todomvc/tree/master/examples/react] into a Liferay Frontend Client Extension.

## Prerequisites

Before making any modifications, it is recommended that you do a `yarn install` and `yarn build` to ensure that the project builds on its own. This way you'll know that the application is fine and you won't be trying ot debug React problems and Liferay CX problems at the same time.

## Modifications

There are four modifications that we need to make to the original project to transform it into a Liferay Custom Element Client Extension.

### Modify `package.json`

We need to modify `package.json`. First, change the name to `react-todo-mvc`. This will help avoid conflicts with other apps that might be deployed.

Next I changed the `build` script so it would use the *dev* build instead of the *prod* build. Not necessary, but it is useful.

Finally, I recommend disabling the `test` script. Once we make the changes, testing will likely not work (unless you change the project to support it) and can fail the builds. As long as the app works before you begin making your changes, the rest of your work is going to be testing in Liferay and fixing any deployment or runtime problems.

### Modify Webpack

In the `webpack.common.js` file, in the `output` block I set the library format, the full block is:

```javascript
output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: 'ReactTodoMvc', // Name of your library
    libraryTarget: 'umd', // Library target format (use 'umd' for most cases)
},
```

The target format is `umd` or *Universal Module Definition*.

### Update `public/index.html`

In this file I changed the `<section>` tag that was the old root to the new tag, `<react-todo-app>`.

### Modify `src/index.js`

We're going to change completely the contents of `src/index.js` to the following:

```javascript
import React from "react";
import {render, unmountComponentAtNode} from 'react-dom';
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./todo/app";
import "../../../todo-app-styles.css";
import "../../../todo-common-base.css";

class WebComponent extends HTMLElement {
  connectedCallback() {
    render(<React.StrictMode>
      <HashRouter>
        <Routes>
            <Route path="*" element={<App />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>, this);
  }

  disconnectedCallback() {
    unmountComponentAtNode(this);
  }
}

const ELEMENT_NAME = 'react-todo-mvc';

if (customElements.get(ELEMENT_NAME)) {
  // eslint-disable-next-line no-console
  console.log(`Skipping registration for <${ELEMENT_NAME}> (already registered)`);
} else {
  customElements.define(ELEMENT_NAME, WebComponent);
}
```

This replaces the default of using `render()` on the `root` div, instead leveraging a WebComponent to define the React app as a standard web component (custom element).

### Create the `client-extension.yaml` File

This file will not already exist, we need to create the file. The contents of the file are:

```yaml
assemble:
  - from: dist
    into: static
react-todo-mvc:
  cssURLs:
    - app.css
  friendlyURLMapping: react-todo-mvc
  htmlElementName: react-todo-mvc
  instanceable: false
  name: React TODO MVC
  portletCategoryName: category.client-extensions
  type: customElement
  urls:
    - app.bundle.js
  useESM: true
```

The first key part is the `assemble` `from` location. You find the path to use here by invoking `yarn build`, then see where the *js* and *css* files end up.

The next key part is the *name*, `friendlyURLMapping`, `htmlElementName` fields, these are set to match the custom element name that we used in the `src/index.js` file.

The `name` attribute is set to the value that we will see in the Liferay UI content pages, so pick a name that will make sense to your page maintainers.

The final key part is the `cssURLs` and `urls` attributes. These list all of the individual CSS and JS files from the assemble/build directory, or in `dist` in this particular case. Fortunately we have only one CSS file to worry about and one js file. *Note* when handling multiple files, ensure they are listed in the same order as the generated `dist/index.html` script loading order; this can be very important otherwise you may get JS console errors when trying to use the custom element.

## Building

To just build and test the React application, you can use the commands `yarn build` to build the artifacts. You can use `yarn serve` to test it out. *Note* that you can't just open the HTML file directly in the browser, it will fail to load the resources because of CORS errors.

To build the client extension, use either `blade gw buildClientExtensionZip` or `../../gradlew buildClientExtensionZip` which will generate a file named `react.zip` inside of the `dist` folder. This _is_ your client extension file, ready for deployment.

## Deployment

When using your local bundle, you would deploy using the command `blade gw deploy` or `../../gradlew deploy` which will take your `react.zip` file and push it to the `bundles/osgi/client-extensions` folder.

Alternatively you can manually put the `react.zip` file into the `osgi/client-extensions` folder in a self-hosted or PaaS environment, or you can use the LCP command line tool to push to a SaaS or PaaS environment.

## Testing

After deploying, you should see a message in the Liferay logs like:

```
2024-11-04 18:54:33.961 INFO  [fileinstall-directory-watcher][BundleStartStopLogger:68] STARTED react_7.4.3.125 [1393]
```

This implies that your new client extension is ready for use.

To test, log in as the Liferay administrator, edit a content page and place the new *React TODO MVC* fragment on the page and publish the page. Test the page and note that it works.

## Concerns

The primary concern is the use of the address bar and hashing. The application of course depends upon these features for presentation, but Liferay will not respect them, and it will also cause problems if you build and deploy a different implementation of the Todo MVC application and use it on the same page. The general rule for Liferay is _never use the address bar_ because Liferay owns it, not your application. While your app will work while you stay on the one page, it will break as you navigate around the portal. It is often better to remove address bar usage/hashing and instead rely on manual routing or React's `MemoryRouter`.
