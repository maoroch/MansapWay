const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const analyzeResume = require('./resumeParser');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/analyze-resume', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ result: 'Файл не загружен' });

  const result = await analyzeResume(req.file.path);
  res.json({ result });
});


app.listen(3001, () => console.log('Сервер запущен: http://localhost:3001'));
