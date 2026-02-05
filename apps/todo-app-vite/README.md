# React Todo POC App with Vite
A lightweight React POC TODO app to experiment with Redux library.

## Features

## How to Run

## Troubleshooting

### Error: port is already in use
`Error: listen EADDRINUSE: address already in use :::4210`
If this happens, you need to find and kill the processes using a specific port (e.g. `4200`). For that, execute these commands in **PowerShell** or **Command Prompt**:
- Find all processes using port `4200`:
  - **Windows:** `netstat -ano | findstr :4200`
  - **Mac / Linux:** `lsof -i :4200`
- It will return results like these:
  - **Windows:** `TCP    0.0.0.0:4200     0.0.0.0:0     LISTENING     12345`
  - **Mac / Linux:** `node    98765   youruser   0u  IPv4  12345678      0t0  TCP *:4200 (LISTEN)`
- The last number (`12345` or `98765`) is the PID. You need to kill all found PIDs using this command:
  - **Windows:** `taskkill /PID 12345 /F`
  - **Mac / Linux:** `kill -9 98765`

