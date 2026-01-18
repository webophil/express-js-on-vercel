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
        <title>Outils Vibe Coding par PhilDEV</title>
        <meta 
        name="description" 
        content="Outils et aides au développement en Vibe Coding - SEO et environnement React/TypeScript"
        />
        <meta name="author" content="PhilDEV" />
        <link rel="canonical" href="https://outils.phildev.fr" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>

  <header class="site-header">
    <div class="header-container">
      <img
        src="/phildev-logo.png"
        alt="PhilDEV - développement web"
        class="logo"
      />

      <nav>
        <a href="https://phildev.fr">Accueil PhilDEV</a>
        <a href="/about">About</a>
        <a href="/api-data">API Data</a>
        <a href="/healthz">Health</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <!-- Iframe temporaire de test -->
    <iframe
      src="https://warm-red-wave.agentui.app?x_token_auth=..."
      height="600"
      loading="lazy"
    ></iframe>
  </main>

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
