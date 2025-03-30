const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// POST /task -> append to task-queue.json
app.post('/task', (req, res) => {
    const task = req.body;
    console.log('[+] Incoming task:', task);
    fs.appendFileSync('task-queue.json', JSON.stringify(task) + '\n');
    res.status(200).json({ status: 'received' });
});

// ✅ NEW: POST /live -> overwrite live-task.json
app.post('/live', (req, res) => {
    const task = req.body;
    console.log('[*] Overwriting live task:', task);
    fs.writeFileSync('live-task.json', JSON.stringify(task, null, 2));
    res.status(200).json({ status: 'live task updated' });
});

// Health check
app.get('/', (req, res) => {
    res.send('Lex Cloud Bridge is live.');
});

app.listen(PORT, () => {
    console.log(`Lex Cloud Bridge running on port ${PORT}`);
});
