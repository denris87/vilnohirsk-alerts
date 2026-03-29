const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Налаштування CORS, щоб твій основний сайт міг брати дані
app.use(cors());

// Шлях до файлу з даними
const dataPath = path.join(__dirname, 'alert.json');

app.get('/api/alert', (req, res) => {
    try {
        // Читаємо файл synchronously для простоти (для невеликих файлів це ок)
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(rawData);
        
        // Обробимо текст, щоб перетворити \n на <br> для HTML
        if (data.text) {
            data.textHtml = data.text.replace(/\n/g, '<br>');
        }
        
        res.json(data);
    } catch (err) {
        console.error("Error reading alert file:", err);
        // Віддаємо порожній об'єкт або помилку, щоб сайт не впав
        res.status(500).json({ show: false, error: "Помилка завантаження даних" });
    }
});

// Базовий маршрут для перевірки, чи працює сервер
app.get('/', (req, res) => {
    res.send('Vilnohirsk Alerts API is running. Go to /api/alert for data.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Alerts server running on port ${PORT}`));
