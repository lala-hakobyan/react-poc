# React Todo POC App with Vite
A lightweight React POC Todo application to experiment with Redux library.

## Compatibility
The project is compatible with the following technology versions:
- **react:** `^19.1.0`
- **Node.js:** `v20+`   
  This project was tested with **Node.js** `v22.17.0`.

## Features and Best Practices
While this is not a full production ready application, there are several features and best practices you can explore to adapt in your production ready applications:
- Responsive, mobile first layout
- Scalable folder structure
- Redux pattern applied following generic best practices
  (Please be aware that Redux pattern should not be prefered for this kind of small and simple applications, it is more for complex application which require a complex syncronization between different features).
- Indicator showing if user is offline/online which is useful when apps support also offline functionality.   

## How to Run

### Setup Project Locally

Follow these steps to set up the project locally:
- Go to the root of this project, specifically the `apps/todo-app-vite` folder and do `npm install`
- Open your hosts file and add the following line of code:
  `127.0.0.1       local.react-todo-app.com`   
  Below are the hosts file paths for different operating systems: 
  - **Windows:** `C:\Windows\System32\drivers\etc\hosts`
  - **macOS / Linux:** `/etc/hosts`
  This maps your local IP to the custom local host name which will be used when running development server.
- Make sure you have compatible Node.js version installed. You can use **Node Version Manager (NVM)** to simulate different **Node.js** versions on your machine. Example of compatible Node.js version: `v22.17.0`   
For the full compatibility information, please check [Compatibility](#compatibility) section.

After finishing these steps, you can use the commands provided in the section below to run the project. 

### Run Project

- **Start a local development server:** `npm run dev`     
  Once the server is running, open your browser and navigate to `local.react-todo-app.com:4210/`. The application will automatically reload whenever you modify any of the source files.
- **Start the local API server:**: `npm run server`
  This runs the local mock APIs required for the application to function. 

## Troubleshooting

### Error: port is already in use
`Error: listen EADDRINUSE: address already in use :::4210`
If this happens, you need to find and kill the processes using a specific port (e.g. `4210`). For that, execute these commands in **PowerShell** or **Command Prompt**:
- Find all processes using port `4210`:
  - **Windows:** `netstat -ano | findstr :4210`
  - **Mac / Linux:** `lsof -i :4210`
- It will return results like these:
  - **Windows:** `TCP    0.0.0.0:4210     0.0.0.0:0     LISTENING     12345`
  - **Mac / Linux:** `node    98765   youruser   0u  IPv4  12345678      0t0  TCP *:4210 (LISTEN)`
- The last number (`12345` or `98765`) is the PID. You need to kill all found PIDs using this command:
  - **Windows:** `taskkill /PID 12345 /F`
  - **Mac / Linux:** `kill -9 98765`

