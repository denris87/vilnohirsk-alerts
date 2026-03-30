const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // Подключаем чтение YAML

const app = express();
app.use(cors());

const dataPath = path.join(__dirname, 'alert.yaml'); // Теперь читаем YAML файл

app.get('/api/alert', (req, res) => {
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const data = yaml.load(fileContents); // Переводим YAML в формат для сайта
        
        // Функция, которая ищет **текст** и делает его жирным <b>текст</b>
        const processText = (arr) => {
            if (!arr) return;
            arr.forEach(item => {
                if (item.text) {
                    item.text = item.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
                }
            });
        };

        processText(data.communal);
        processText(data.news);

        res.json(data);
    } catch (err) {
        console.error("Error reading alert file:", err);
        res.status(500).json({ communal: [], news: [] });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Alerts server running on port ${PORT}`));
