const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/api/alert', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('alert.json', 'utf8'));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Ошибка чтения данных" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Alerts server running on port ${PORT}`));
