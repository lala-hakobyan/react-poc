# React POC Projects

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
- **IDE productive workflows for debugging and AI feature generation**
- **Caching functionality through IndexedDB and Web Workers**
- **Logging functionality**
- **React design patterns (Layout, Custom Hooks, Compound, Singleton)**
- **Integrated linting**
- **Advanced error handling**

### [React Todo POC App with Vite (`todo-app-vite`)](./apps/todo-app-vite)

A lightweight React POC **Todo application** built with **Vite** to experiment with **Redux**, served by a local mock back-end API.

While this is not a full production-ready application, there are several features and best practices you can explore to adapt in your production-ready applications:
- **TypeScript-based, fully typed code**
- **Responsive, mobile-first layout**
- **Scalable folder structure**
- **Redux library used for state management**
- **Online/offline sync indicator**
- **Integrated linting**

> **Note:** The [debugging-handbook-demo-v1](https://github.com/lala-hakobyan/react-poc/tree/debugging-handbook-demo-v1) branch of this repository is the version used for [Front-end Debugging Tools Handbook](https://github.com/lala-hakobyan/front-end-debugging-handbook) specific React features and Redux state experimentation and debugging.
The projects may contain only slight visual changes compared to screenshots presented in the handbook.


## License

Copyright © 2026 Lala Hakobyan. All rights reserved.

This repository contains front-end projects that also serve as the official companions for the Front-end Debugging Tools Handbook by Lala Hakobyan.

**You MAY**<br>
- Fork, clone and run this application locally for learning, debugging and educational purposes.
- Extract and reuse the source code, architecture and CSS styles in your own personal or commercial projects.
- Reference this project and the handbook, and link to the official repositories in your own applications and documentation.

**You MAY NOT** (without prior written permission from the author)<br>
- Host, publish or distribute a copy or derivative of this application that could reasonably be mistaken for the official project.
- Reuse the specific branding assets, including the brand colors, custom images and official logos to claim the project's visual identity as your own.
- Impersonate the official handbook or its author.

**Source Code**<br>
The underlying source code and CSS authored by Lala Hakobyan are licensed under the [MIT License](./LICENSE-CODE) and may be used in personal and commercial projects.

**Official Source**<br>
For the latest updates, please refer to the official repository: https://github.com/lala-hakobyan/react-poc

**Attribution Example**<br>
If you reference this project or use the source code in your own documentation, you can use the following format:

> **Source:** "My Notes App POC" by Lala Hakobyan. Copyright © 2026. All rights reserved. Available at: https://github.com/lala-hakobyan/react-poc


## Feedback and Issues
- If you found a bug or have feedback, please feel free to reach out via [LinkedIn](https://www.linkedin.com/in/lala-hakobyan) or submit an issue on the [**Issues page**](https://github.com/lala-hakobyan/react-poc/issues) on GitHub.
- ❌ **Please do not submit Pull Requests** (I am not accepting external contributions at this time).


## Author
**Name:** Lala Hakobyan<br>
**LinkedIn Profile:** [linkedin.com/in/lala-hakobyan](https://www.linkedin.com/in/lala-hakobyan)<br>
**Email:** [hakobyanlala@gmail.com](mailto:hakobyanlala@gmail.com)<br>
