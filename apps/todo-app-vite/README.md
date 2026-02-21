# React Todo POC App with Vite
A lightweight React POC Todo application to experiment with Redux library.

## About
This is a simple React POC Todo application built with **Vite** which is designed to work locally with mock back-end. It provides the following functionalities:
- Add, delete and mark todos as completed.
- Add high-priority todos by specifying `!` at the end of the text.
- View indicator of online/offline status in the header.
  **Note:** Offline status in this context means that the user is able to work locally, while being disconnected from the internet. It assumes that the data will be synced with the cloud when he/she becomes online.
  However, since it is a POC app, it works only through local APIs and has no offline functionality support.
  Offline Sync Status can be toggled by choosing **Offline** mode from the **Network** panel throttling dropdown.


## Compatibility
The project is compatible with the following technology versions:
- **React:** `^19.1.0`
- **Node.js:** `v20+`
  This project was tested with **Node.js** `v22.17.0`.


## Features and Best Practices
While this is not a full production-ready application, there are several features and best practices you can explore to adapt in your production-ready applications:
- TypeScript-based, fully typed code.
  Using TypeScript over JavaScript makes code more understandable and maintainable as well as helps to catch errors early in the development process (at compile time) rather than at runtime.
- Responsive, mobile-first layout.
- Scalable folder structure.
- Redux pattern applied following generic best practices.
  **Note:** Please be aware that Redux pattern should not be preferred for this kind of small and simple application. It is more for complex applications which require a complex synchronization between different features.
- Indicator showing if user is offline/online which is useful when apps also support offline functionality.
- Integrated linting.
  Linting helps to write universal code that follows **React Rules of Hooks**, resulting in more maintainable and performant applications.

## How to Run

### Setup Project Locally

Follow these steps to set up the project locally:
- Go to the root of this project, specifically the `apps/todo-app-vite` folder and do `npm install`.
- Open your hosts file and add the following line of code:
  `127.0.0.1       local.react-todo-app.com`
  Below are the hosts file paths for different operating systems:
  - **Windows:** `C:\Windows\System32\drivers\etc\hosts`
  - **macOS / Linux:** `/etc/hosts`
    This maps your local IP to the custom local host name which will be used when running the development server.
- Make sure you have a compatible Node.js version installed. You can use **Node Version Manager (NVM)** to simulate different **Node.js** versions on your machine. Example of a compatible Node.js version: `v22.17.0`.
  For the full compatibility information, please check the [Compatibility](#compatibility) section.

After finishing these steps, you can use the commands provided in the section below to run the project.

### Run Project
Below are some of the workflows and commands for local development:

**Run Development Server**
In order to run the project locally, you need to run the development server and API server in separate terminal windows:
- **Start the local API server:** `npm run server`
  This runs the local mock APIs required for the application to function.
- **Start the local development server:** `npm run dev`
  Once the server is running, open your browser and navigate to `local.react-todo-app.com:4210/`. The application will automatically reload whenever you modify any of the source files.

**Serve Production Build**
- **Run production build locally:** `npm run build`
- **Serve production build locally:** `npm run start`
  This serves the application from the built production files under the `.vite` folder.

**Linting**
- **Run linting:** `npm run lint`
- **Auto-fix linting issues:** `npm run lint:fix`

**Unit Testing**
- **Check type compatibility of unit test files:** `npm run test:build`
- **Run unit tests for loading reducers:** `npm run test:loading-reducers`
- **Run unit tests for selectors:** `npm run test:selectors`

## Troubleshooting

### Error: port is already in use
`Error: listen EADDRINUSE: address already in use :::4210`
If this happens, you need to find and kill the processes using a specific port (e.g. `4210`). For that, execute these commands in **PowerShell** or **Command Prompt** in **Windows** and in **Terminal** for **macOS / Linux**:

- Find all processes using port `4210`:
  - **Windows:** `netstat -ano | findstr :4210`
  - **macOS / Linux:** `lsof -i :4210`
- It will return results like these:
  - **Windows:** `TCP    0.0.0.0:4210     0.0.0.0:0     LISTENING     12345`
  - **macOS / Linux:** `node    12345   youruser   0u  IPv4  0x854013108bce2194      0t0  TCP *:4210 (LISTEN)`
- The number `12345` in this example is the PID. You need to kill all found PIDs using this command:
  - **Windows:** `taskkill /PID 12345 /F`
  - **macOS / Linux:** `kill -9 12345`
