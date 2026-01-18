import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/* -------------------------------------------------
   ESM __dirname / __filename
------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* -------------------------------------------------
   Express app
------------------------------------------------- */

const app = express()

/* -------------------------------------------------
   Static files (CSS, images, etc.)
------------------------------------------------- */

app.use(express.static(path.join(__dirname, '..', 'public')))

/* -------------------------------------------------
   Load shared layout parts
------------------------------------------------- */

const header = fs.readFileSync(
  path.join(__dirname, '..', 'components', 'header.html'),
  'utf8'
)

const footer = fs.readFileSync(
  path.join(__dirname, '..', 'components', 'footer.html'),
  'utf8'
)

/* -------------------------------------------------
   Page renderer
------------------------------------------------- */

type PageOptions = {
  title: string
  description?: string
  canonical?: string
  content: string
}

function renderPage({
  title,
  description,
  canonical,
  content
}: PageOptions) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>${title}</title>
    ${description ? `<meta name="description" content="${description}"/>` : ''}
    ${canonical ? `<link rel="canonical" href="${canonical}"/>` : ''}

    <meta name="author" content="PhilDEV"/>

    <link rel="stylesheet" href="/style.css"/>
  </head>
  <body>
    ${header}

    <main class="container">
      ${content}
    </main>

    ${footer}
  </body>
</html>`
}

/* -------------------------------------------------
   Routes HTML
------------------------------------------------- */

// Home
app.get('/', (req, res) => {
  res.type('html').send(
    renderPage({
      title: 'Outils Vibe Coding par PhilDEV',
      description:
        'Outils et aides au développement en Vibe Coding – SEO et environnement React / TypeScript.',
      canonical: 'https://outils.phildev.fr/',
      content: `
        <h1>Outils Vibe Coding</h1>

        <p>
          Ressources, analyses et outils autour du développement web moderne,
          du SEO et des applications React / TypeScript.
        </p>

        <iframe
          src="https://warm-red-wave.agentui.app?x_token_auth=..."
          height="600"
          loading="lazy"
        ></iframe>
      `
    })
  )
})

// Audit SEO
app.get('/auditseo', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'auditseo.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: 'Audit SEO React & SPA – PhilDEV',
      description:
        'Audit SEO spécialisé pour applications React, SPA et sites JavaScript modernes.',
      canonical: 'https://outils.phildev.fr/auditseo',
      content: auditContent
    })
  )
})

/* -------------------------------------------------
   API routes
------------------------------------------------- */

// Example API endpoint
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry']
  })
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

/* -------------------------------------------------
   Export app (Vercel)
------------------------------------------------- */

export default app
