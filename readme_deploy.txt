GPT ↔ Lex Cloud Bridge Server Deployment (DigitalOcean)

STEP-BY-STEP:

1. Go to https://cloud.digitalocean.com/apps

2. Click "Create App", then select:
   - Source: "GitHub" (if you want to sync) OR
   - "Deploy from source code" → Upload the contents of this folder

3. When prompted:
   - **Environment**: Node.js
   - **Run command**: npm install
   - **Start command**: npm start
   - **Port**: 8080 (or leave default if auto-detected)

4. Wait for deployment to finish.
   - You will receive a **public domain** (e.g., `https://your-bridge-app.do.app`)

5. Go to your Lex machine.
   Open `lex-cloud-relay.js` and change:

   const GPT_SERVER_URL = 'ws://localhost:8080';

   TO:

   const GPT_SERVER_URL = 'wss://your-bridge-app.do.app';

6. Save, restart the relay:
   node lex-cloud-relay.js

✅ Done! Now GPT can send commands to Lex in real time.