const { loadEnvConfig } = require('@next/env');
// eslint-disable-next-line @typescript-eslint/no-require-imports
let express = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
let notes = require('./database.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const authMiddleware = require('./authMiddleware');

// Tell Next.js to parse the .env files in your root directory
// The second argument determines if it should load development overrides
const projectDir = process.cwd();
loadEnvConfig(projectDir, process.env.NODE_ENV !== 'production');

const app = express();
const port = 3010;
const enabledCORSError = process.env.NEXT_PUBLIC_ENABLE_CONTACT_CORS_API_ERROR === 'true';
const corsDomains = enabledCORSError ?
  ['http://localhost:3000'] :
  ['http://localhost:3000','http://local.react-note-app.com:3000']

app.use(cors({
  origin: corsDomains, // Specify allowed domains
  methods: 'GET, POST, PUT', // Specify the allowed methods
  allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  credentials: true, // Allow cookies/auth headers
}));

app.use(express.json());

app.get('/api/notes', authMiddleware, (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  notes.sort((a,b) => b.creationDate.localeCompare(a.creationDate)).slice(offset, limit);

  let finalNotes = notes.slice(offset, offset + limit);

  setTimeout(() => res.json(finalNotes), 1000);
});

app.get('/api/notes/:id', authMiddleware, (req, res) => {
  const noteId = req.params.id;
  const note = notes.find(note => note.id === noteId);
  setTimeout(() => res.json(note),3000);
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

app.get('/api/banners/ad', authMiddleware, (req, res) => {
  setTimeout(() => res.json('/assets/images/fe-debugging-handbook-ad-banner.png'), 1000);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
