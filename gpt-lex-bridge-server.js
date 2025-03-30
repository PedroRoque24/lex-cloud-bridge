const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  console.log('[Bridge] New connection established.');

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);

      if (msg.type === 'handshake' && msg.name) {
        clients.set(msg.name, ws);
        console.log(`[Bridge] Registered client: ${msg.name}`);
        return;
      }

      if (msg.type === 'command' && msg.target && msg.payload) {
        const targetSocket = clients.get(msg.target);
        if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
          targetSocket.send(JSON.stringify(msg.payload));
          console.log(`[Bridge] Command sent to ${msg.target}`);
        } else {
          console.warn(`[Bridge] Target ${msg.target} not connected.`);
        }
      }
    } catch (err) {
      console.error('[Bridge] Error parsing message:', err.message);
    }
  });

  ws.on('close', () => {
    for (const [name, socket] of clients.entries()) {
      if (socket === ws) {
        clients.delete(name);
        console.log(`[Bridge] Disconnected: ${name}`);
        break;
      }
    }
  });
});

console.log('[Bridge] GPT ↔ Lex relay server is running...');