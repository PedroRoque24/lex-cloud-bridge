const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// 🔥 THIS LINE allows serving static files like live-task.json
app.use(express.static(__dirname));

// Task Receiver Endpoint (for GPT)
app.post('/task', (req, res) => {
    const task = req.body;
    console.log('[+] Incoming task:', task);
    fs.appendFileSync('task-queue.json', JSON.stringify(task) + '\n');
    res.status(200).json({ status: 'received' });
});

// Health Check
app.get('/', (req, res) => {
    res.send('Lex Cloud Bridge is live.');
});

app.listen(PORT, () => {
    console.log(`Lex Cloud Bridge running on port ${PORT}`);
});
