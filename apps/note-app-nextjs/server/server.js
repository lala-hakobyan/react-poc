// eslint-disable-next-line @typescript-eslint/no-require-imports
let express = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
let notes = require('./database.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors()); // Allow all origins
app.use(express.json());

app.get('/api/notes', (req, res) => {
    const count = req.query.pageCount;
    let finalNotes = count!==undefined ? notes.slice(count) : notes;

    setTimeout(() => res.json(finalNotes), 1000);
});

app.post('/api/notes', (req, res) => {
    notes.push(req);
    res.json(req);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes = notes.filter(note => note.id !== noteId);
    res.send();
});

app.put('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedNote = req.body;

    const noteIndex = notes.findIndex(note => note.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
    }

    notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
    res.json(notes[noteIndex]);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});