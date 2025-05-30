require('dotenv').config(); // <-- важно!
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeResume(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(buffer);
    fs.unlinkSync(filePath); // удаляем файл после анализа

    const resumeText = parsed.text.slice(0, 2000); // ограничим объём
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Ты карьерный консультант. Дай советы по улучшению резюме.' },
        { role: 'user', content: resumeText }
      ]
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return 'Ошибка при анализе файла.';
  }
}

module.exports = analyzeResume;
