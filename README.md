# react-poc
A collection of React POC starter projects designed to reflect best practices in modern React development. The projects are intended for experimenting and debugging React features and frameworks, benchmarking performance and creating maintainable, scalable architecture POCs as a foundation for real production apps.

## Projects

### [Next.js React POC Note Application (`note-app-nextjs`)](./apps/note-app-nextjs)

A scalable and maintainable React Next.js POC Note management application to serve as a foundation for real production apps, served by a local mock back-end API.

This application can be used as a foundation for real production apps due to its maintainable and scalable architecture and isolation of layers: data (API), state, logger, cache.
It contains the following useful features and best practices:
- **Responsive, mobile-first layout and styling through SASS modules**
- **Dark/light themes support**
- **Scalable and maintainable architecture:**
  - Separate state layer with Zustand store.
  - Scalable folder structure.
  - Isolation of data (API), cache, logger layers through separate dedicated services.
  - Separate `proxyRequestService.ts` to universally handle API requests passing through Next.js server components.
- **Security headers (CORS, CSP)**
- **Caching functionality through IndexedDB and Web Workers**
- **Logging functionality**
- **React design patterns (Layout, Custom Hooks, Compound, Singleton)**
- **Integrated linting**
- **Advanced error handling**
- The [debugging-handbook-demo-v1](https://github.com/lala-hakobyan/react-poc/tree/debugging-handbook-demo-v1) branch of this project is the version used for [Front-end Debugging Tools Handbook](https://github.com/lala-hakobyan/front-end-debugging-handbook) specific React features experimentation and debugging.
  **Note:** It may contain only slight visual changes compared to screenshots presented in the handbook.

### [React Todo POC App with Vite (`todo-app-vite`)](./apps/todo-app-vite)

A lightweight React POC **Todo application** built with **Vite** to experiment with **Redux**, served by a local mock back-end API.

While this is not a full production-ready application, there are several features and best practices you can explore to adapt in your production-ready applications:
- **TypeScript-based, fully typed code**
- **Responsive, mobile-first layout**
- **Scalable folder structure**
- **Redux library used for state management**
- **Online/offline sync indicator**
- **Integrated linting**


## License
- This project is released under the [MIT License](https://github.com/lala-hakobyan/react-poc/blob/main/LICENSE).
- You are welcome to clone, explore and reuse it for educational and debugging purposes as well as in your production code.
- However, to keep the repository clean and focused:
  - ❌ **Please do not submit Pull Requests.** (I am not accepting external contributions at this time).
  - ✅ **Feel free to Fork** or clone the repository for your own experiments.
  - ✅ If you find issues or want to request a new feature, you can open an issue in the [Issues tab](https://github.com/lala-hakobyan/react-poc/issues).
  - ✅ If you have feedback or questions, feel free to reach out via LinkedIn or email.
- If you share or publish your own version, kindly retain the [license](https://github.com/lala-hakobyan/react-poc/blob/main/LICENSE) and provide appropriate credit.

## Author
**Name:** Lala Hakobyan
**LinkedIn Profile:** [linkedin.com/in/lala-hakobyan-71aa64b8](https://www.linkedin.com/in/lala-hakobyan)
**Email:** [hakobyanlala@gmail.com](mailto:hakobyanlala@gmail.com)
