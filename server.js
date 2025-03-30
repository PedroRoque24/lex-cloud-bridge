const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/task', (req, res) => {
    const task = req.body;
    console.log('[+] Incoming task:', task);
    fs.appendFileSync('task-queue.json', JSON.stringify(task) + '\n');
    res.status(200).json({ status: 'received' });
});

app.get('/', (req, res) => {
    res.send('Lex Cloud Bridge is live.');
});

app.listen(PORT, () => {
    console.log(`Lex Cloud Bridge running on port ${PORT}`);
});
