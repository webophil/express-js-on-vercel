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

        <img src="vibecoding.jpg" width="180" alt="Vibe Coding à Reims" class="image-gauche">
        <p>
          Ressources, analyses et outils autour du développement web moderne,
          du SEO adapté et des applications web React/TypeScript.
        </p>

        <p>
          Vibe Coding VS no-code ou low-code : les applications développées en Vibe ou no-code sont-elles stables et exploitables à grande échelle ? Oui, si on contrôle et gère l'architecture et la hiérarchie du code. OUI si on utilise les bons leviers de protection et de sécurisation !
        </p>

        <p>
          Des PWA (Progressive Web App) qui remplacent avantageusement les applications "mobile" natives ? En tous cas, c'est une alternative efficace, performante et, qui plus est, beaucoup moins onéreuse pour un résultat probant qui évite les coûts prohibitifs des Stores classiques !
        </p>
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
   Export app (Vercel)
------------------------------------------------- */

export default app
