const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Append to task-queue.json (for logging multiple tasks)
app.post('/task', (req, res) => {
    const task = req.body;
    console.log('[+] Incoming task to /task:', task);
    fs.appendFileSync('task-queue.json', JSON.stringify(task) + '\n');
    res.status(200).json({ status: 'queued' });
});

// ✅ Overwrite live-task.json with timestamp
app.post('/live', (req, res) => {
    const task = req.body;
    task.timestamp = Date.now(); // force Lex to detect as new
    const final = JSON.stringify(task, null, 2);
    try {
        fs.writeFileSync('live-task.json', final);
        console.log('[*] live-task.json updated:', task);
        res.status(200).json({ status: 'live task written' });
    } catch (e) {
        console.error('[!] Failed to write live-task.json:', e.message);
        res.status(500).json({ status: 'error', error: e.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('Lex Cloud Bridge is live.');
});

app.listen(PORT, () => {
    console.log(`Lex Cloud Bridge running on port ${PORT}`);
});
