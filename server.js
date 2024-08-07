const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { getConfiguration } = require('./openai-api');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/setHouseSetup', async (req, res) => {
    const description = req.body.description;

    try {
        const config = await getConfiguration(description);

        // Verifica se a resposta é um JSON válido
        let configJson;
        try {
            configJson = JSON.parse(config);
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid JSON response from OpenAI API' });
        }

        fs.writeFileSync(path.join(__dirname, 'public', 'config.json'), JSON.stringify(configJson, null, 2));
        res.json(configJson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
