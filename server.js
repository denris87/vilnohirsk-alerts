const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const dataPath = path.join(__dirname, 'alert.json');

app.get('/api/alert', (req, res) => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(rawData);
        
        // Формируем красивый HTML прямо на сервере
        if (data.show && data.text) {
            let formattedText = '';
            
            // Добавляем центрированный заголовок
            if (data.title) {
                formattedText += `<div style="font-size: 16px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px; color: #ffcc00; text-align: center;">${data.title}</div>`;
            }

            // Заменяем переносы строк \n на <br> и выравниваем текст по левому краю ("в столбик")
            const bodyText = data.text.replace(/\n/g, '<br>');
            formattedText += `<div style="text-align: left; font-size: 14px; font-weight: 500; line-height: 1.6; padding: 0 10px;">${bodyText}</div>`;

            // Перезаписываем text, так как твой основной сайт читает именно d.text
            data.text = formattedText;
        }
        
        res.json(data);
    } catch (err) {
        console.error("Error reading alert file:", err);
        res.status(500).json({ show: false, error: "Помилка завантаження даних" });
    }
});

app.get('/', (req, res) => {
    res.send('Vilnohirsk Alerts API is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Alerts server running on port ${PORT}`));
