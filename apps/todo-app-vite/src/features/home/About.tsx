export default function About() {
    return (
        <section>
            <h2>About</h2>
            <p>Hello, this is a simple POC Todo app which you can use to add and manage Todos.</p>
            <p>It is intended to work in two modes: <strong className="primary-text">Online</strong> and <strong className="primary-text">Offline</strong>.</p>
            <p>You can find the sync status at the header of the app.</p>
            <p>But since this is a POC app, it only works offline with local mocks.</p>
        </section>
    )
}
