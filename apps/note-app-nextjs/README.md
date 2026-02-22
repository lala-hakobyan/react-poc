# React Note POC App with Next.js
A scalable and maintainable React Next.js POC Note management application to serve as a foundation for real production apps, served by a local mock back-end API.

## About
This project is designed to work locally with a mock back-end API. It provides the following functionalities:
- View latest notes on the Home page Dashboard.
- View, edit and delete notes on the Notes page.
- If an API error happens or the network is gone, view notes in read-only mode until issues are fixed.
- Access the Contact page, which is connected to the mock back-end API.


## Compatibility
The project is compatible with the following technology versions:
- **Next.js**: `v16.0.7`
- **React**: `v19.1.0`
- **Node.js**: `v20+`
  This project was tested with **Node.js** `v22.17.0`.


## Features and Best Practices
This application can be used as a foundation for real production apps due to its maintainable and scalable architecture and isolation of layers: data (API), state, logger, cache.
It contains the following useful features and best practices:
- **Server components through Next.js**
- **Responsive, mobile-first layout**
- **Dark/light themes support**
  **Note:** Theme toggle icon will be added in the header soon.
- **Scalable and maintainable architecture:**
  - Separate state layer with Zustand store.
  - Scalable folder structure.
  - Isolation of data (API), cache, logger layers through separate dedicated services.
  - Separate `proxyRequestService.ts` to universally handle API requests passing through Next.js server components.
- **State management with Zustand**
  - Centralized state management with **Zustand** using slicing to separate state into stand-alone layers.
  - **Zustand** integration with Redux DevTools through middleware.
- **IDE productive workflows:**
  - WebStorm debugging setup (`.run` folder)
  - Cursor debugging configurations (`.vscode/launch.json`)
  - Cursor AI agent starter rules, commands, skills and feature specs (`.cursor` folder)
- **Security headers (CORS, CSP)**
- **Caching functionality:**
  - Notes data is stored in the browser IndexedDB database upon each action.
  - When any failure happens on the API side or the user is offline, they can still view their notes in read-only mode from the IndexedDB cache until issues are resolved.
  - A separate service worker (`image-service-worker.js`) caches necessary image files (logos, icons and latest note media files) on the Home page so that the Notes List page loads this media from the service worker cache.
    **Note:** For the service worker to work, you need to run the application with https (`npm run dev:https`) and access it under localhost instead of a custom local domain, like: `https://localhost:3000`.
- **Logging functionality:**
  A separate dedicated singleton logger service to send error messages and necessary context to a front-end monitoring platform. The platform integration is a mock but functional example.
- **React design patterns:**
  - Layout design pattern for arranging components on the screen (`header`, `footer`, `mainLayout`).
  - Hooks pattern used to isolate primary business logic (e.g., `useNoteForm`).
  - Compound Components pattern used for the Modal.
  - Singleton pattern used for all services.
- **Integrated linting:**
  Linting helps to write universal code that follows **React Rules of Hooks** (via the `eslint-config-next` package which uses `eslint-plugin-react-hooks` under the hood), resulting in more maintainable and performant applications.
- **Styling:**
  - BEM approach for class names for better maintainability.
  - SASS modules (concept of CSS modules) used for styles isolation per each component.
- **Advanced error handling:**
  User-friendly errors are displayed for each API failure to provide a better user experience.

## What is Missing
Below are the features that are missing to make this POC fully applicable for a production app foundation:
- **Enhanced accessibility integration (WCAG compliance)**
- **Security enhancement through authentication integration**
- **Testing:**
  - **Unit testing:** Testing isolated functions and logic with mock dependencies to ensure core reliability.
  - **Component testing:** Testing integrated UI pieces with mock dependencies to verify behavior.
  - **E2E testing:** Testing complete user flows with real dependencies on real lower (dev, staging) environments, which preferably mimic production environments.
    **Note:** A standard best practice here is the **Shift Left** strategy. By writing as many tests as possible in the unit and component layers, we catch bugs at early stages before even committing to a shared repository.
- **Pre-commit hooks (e.g., Husky):**
  These hooks automatically enforce linting, unit testing and [conventional commit rules](https://www.conventionalcommits.org/en/v1.0.0/) on every commit. This prevents code that violates established best practices from being pushed to the shared repository.
- **CI/CD pipeline**
- **Cross-device compatibility:**
  This involves testing and bug fixing on real devices (iPhone, Android, Mac). Testing can be done using tools like [BrowserStack](https://www.browserstack.com/).

While it is not convenient to add all of these to a POC project, some will be enhanced in the repository over time.

## How to Run

### Setup Project Locally

Follow these steps to set up the project locally:
- Go to the root of this project, specifically the `apps/note-app-nextjs` folder and do `npm install`.
- Open your hosts file and add the following line of code: `127.0.0.1       local.react-note-app.com`<br>
  Below are the hosts file paths for different operating systems:<br>
  - **Windows:** `C:\Windows\System32\drivers\etc\hosts`
  - **macOS / Linux:** `/etc/hosts`
    This maps your local IP to the custom local host name which will be used when running the development server.
- Make sure you have a compatible Node.js version installed. You can use **Node Version Manager (NVM)** to simulate different **Node.js** versions on your machine.<br>
  Example of a compatible Node.js version: `v22.17.0`. For the full compatibility information, please check the [Compatibility](#compatibility) section.

After finishing these steps, you can use the commands provided in the section below to run the project.

### Run Project
Below are some of the workflows and commands for local development:

**Run Development Server**
In order to run the project locally, you need to run the development server and API server in separate terminal windows:
- **Start the local API server:** `npm run server`<br>
  This runs the local mock APIs required for the application to function.
- **Start the local development server:**
  - `npm run dev` for running under **HTTP**
  - `npm run dev:https` for running under **HTTPS**

  Once the server is running, open your browser and navigate to
  - `http://local.react-note-app.com:3000` or `http://localhost:3000` for **HTTP**.
  - `https://local.react-note-app.com:3000` or `https://localhost:3000` for **HTTPS**.
  The application will automatically reload whenever you modify any of the source files.

**Serve Production Build**
- **Run production build locally:** `npm run build`
- **Serve production build locally:** `npm run start`<br>
  This serves the application from the built production files under the `.next` folder.

**Linting**
- **Run linting:** `npm run lint`
- **Auto-fix linting issues:** `npm run lint:fix`


## How to Debug

### IDE Debugging
Below are instructions on how to set up an IDE debugger for this Next.js project which will work for all Next.js projects, starting from v16.0.3.

- **WebStorm:** The full setup is available in the `.run` folder. It will help you to automatically enable debugging commands in WebStorm once you run this project.

- **Cursor:** The full configuration is available in the `.vscode/launch.json` file. It will help you to automatically enable debugging commands in Cursor once you run this project.

### Browser Extensions
You can use the following browser extensions to enhance your debugging flow:

- **React DevTools:** Inspecting React components and Suspense, profiling.
  It's a free browser extension available for most major browsers.
  - **Chrome:** <span class="primary-link">[Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)</span>
  - **Firefox:** <span class="primary-link">[Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)</span>
  - **Edge:** <span class="primary-link">[Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)</span>

- **Redux DevTools:** Inspecting application state. In this project, the Zustand store is configured through middleware to be available in Redux DevTools.
  It's a free browser extension available for most major browsers:
  - **Chrome:** <span class="primary-link">[Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)</span>
  - **Firefox:** <span class="primary-link">[Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)</span>
  - **Edge:** <span class="primary-link">[Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)</span>

> **Note:** If you want to learn more about the details of IDE configurations or extension debugging, check the **IDE Debugging**, **React DevTools** and **Redux DevTools** chapters in my [Front-end Debugging Tools Handbook](https://github.com/lala-hakobyan/front-end-debugging-handbook).


## Troubleshooting

### Error: port is already in use
`Error: listen EADDRINUSE: address already in use :::3000`

If this happens, you need to find and kill the processes using a specific port (e.g. `3000`). For that, execute these commands in **PowerShell** or **Command Prompt** in **Windows** and in **Terminal** for **macOS / Linux**:

- Find all processes using port `3000`:
  - **Windows:** `netstat -ano | findstr :3000`
  - **macOS / Linux:** `lsof -i :3000`
- It will return results like these:
  - **Windows:** `TCP    0.0.0.0:3000     0.0.0.0:0     LISTENING     12345`
  - **macOS / Linux:** `node    12345   youruser   0u  IPv4  0x854013108bce2194      0t0  TCP *:3000 (LISTEN)`
- The number `12345` in this example is the PID. You need to kill all found PIDs using this command:
  - **Windows:** `taskkill /PID 12345 /F`
  - **macOS / Linux:** `kill -9 12345`
