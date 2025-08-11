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
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  notes.sort((a,b) => b.creationDate.localeCompare(a.creationDate)).slice(offset, limit);

  let finalNotes = notes.slice(offset, offset + limit);

  setTimeout(() => res.json(finalNotes), 1000);
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  notes.unshift(note);
  setTimeout(() => res.json(req.body),1000);
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
  setTimeout(() => res.json(notes[noteIndex]), 1000);
});

app.post('/api/messages/error', (req, res) => {
  setTimeout(() => res.status(200).send({ success: true }), 1000);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
