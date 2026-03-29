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
        res.json(data);
    } catch (err) {
        console.error("Error reading alert file:", err);
        res.status(500).json([]); // Если ошибка, отдаем пустой массив
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Alerts server running on port ${PORT}`));
