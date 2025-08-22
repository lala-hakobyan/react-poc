// eslint-disable-next-line @typescript-eslint/no-require-imports
let express = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
let notes = require('./database.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const authMiddleware = require('./authMiddleware');

const app = express();
const port = 3010;

app.use(cors({
  origin: [
    'http://local.react-note-app.com:3000',
    'http://localhost:3000'
  ], // allow only this domains
  credentials: true, // optional: allow cookies/auth headers
}));

app.use(express.json());

app.get('/api/notes', authMiddleware, (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  notes.sort((a,b) => b.creationDate.localeCompare(a.creationDate)).slice(offset, limit);

  let finalNotes = notes.slice(offset, offset + limit);

  setTimeout(() => res.json(finalNotes), 1000);
});

app.post('/api/notes', authMiddleware, (req, res) => {
  const note = req.body;
  notes.unshift(note);
  setTimeout(() => res.json(req.body),1000);
});

app.delete('/api/notes/:id', authMiddleware, (req, res) => {
  const noteId = req.params.id;
  notes = notes.filter(note => note.id !== noteId);
  res.send();
});

app.put('/api/notes/:id', authMiddleware, (req, res) => {
  const noteId = req.params.id;
  const updatedNote = req.body;

  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
  setTimeout(() => res.json(notes[noteIndex]), 1000);
});

app.post('/api/messages/error', authMiddleware, (req, res) => {
  setTimeout(() => res.status(200).send({ success: true }), 1000);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
