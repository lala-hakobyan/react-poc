let express = require('express');
let todos = require('./database.json');4
const cors = require('cors');

const app = express();
const port = 3040;

app.use(cors({
    origin: [
      'http://local.react-todo-app.com:4210', // allow only these domains
      'http://localhost:4210'
    ],
    credentials: true, // optional: allow cookies/auth headers
}));

app.use(express.json());

app.get('/api/todos', (req, res) => {
    setTimeout(() => res.json(todos), 1000);
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: `${Date.now()}`,
        text: req.body.text,
        isCompleted: false,
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    todos = todos.filter(todo => todo.id !== todoId);
    res.send();
});

app.put('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
    res.json(todos[todoIndex]);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
