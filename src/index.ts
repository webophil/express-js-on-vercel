import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="https://phildev.fr">Accueil PhilDEV</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p></p>
        <img src="/logo.png" alt="Logo" width="120" />
        <iframe src="https://warm-red-wave.agentui.app?x_token_auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3JrZmxvd0lkIjoiY21rZzZjd3dwMDA4a3M0MWZsdXFrempxZSIsImlzU2VydmljZVRva2VuIjp0cnVlLCJleHAiOjE4MDAyNzcxOTgzMDcsImlhdCI6MTc2ODc0MTE5OH0.c3OaYd6fOdcVvErd_xVch0nTGPgxoBmHxan19aHS3MI" width="100%" height="600" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>
  `)
})

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})

// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry'],
  })
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
