// eslint-disable-next-line @typescript-eslint/no-require-imports
let express = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
let notes = require('./database.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const checkAccessToken = require('./authMiddleware.js');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { validateSpecialChars } = require('./validationMiddleware');

const app = express();
const port = 3010;

app.use(cors({
  origin: 'http://local.react-note-app.com:3000', // allow only this domain
  credentials: true, // optional: allow cookies/auth headers
}));

app.use(express.json());

app.get('/api/notes', checkAccessToken, (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  notes.sort((a,b) => b.creationDate.localeCompare(a.creationDate)).slice(offset, limit);

  let finalNotes = notes.slice(offset, offset + limit);

  setTimeout(() => {res.json(finalNotes)}, 1000);
});

app.get('/api/notes/:id', checkAccessToken, (req, res) => {
  const noteId = req.params.id;
  const note = notes.find(note => note.id === noteId);
  setTimeout(() => res.json(note),3000);
});

app.post('/api/notes', checkAccessToken, validateSpecialChars(['title', 'description']), (req, res) => {
  const note = req.body;
  notes.unshift(note);
  setTimeout(() => res.json(req.body),1000);
});

app.delete('/api/notes/:id', checkAccessToken, (req, res) => {
  const noteId = req.params.id;
  notes = notes.filter(note => note.id !== noteId);
  setTimeout(() => res.status(200).send({ success: true }), 1000);
});

app.put('/api/notes/:id', checkAccessToken, validateSpecialChars(['title', 'description']), (req, res) => {
  const noteId = req.params.id;
  const updatedNote = req.body;

  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
  setTimeout(() => res.json(notes[noteIndex]), 1000);
});

app.post('/api/messages/error', checkAccessToken, (req, res) => {
  setTimeout(() => res.status(200).send({ success: true }), 1000);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
