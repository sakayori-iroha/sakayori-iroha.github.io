import './style.css'
import { DICT, getInitialLang, LANGS, setLang, type Lang } from './i18n'
import { mountScene } from './scene'

type Link = { label: string; href: string; note?: string }

type Section = {
  title: string
  items: string[]
}

const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/sakayori-iroha', note: '@sakayori-iroha' },
  { label: 'Email', href: 'mailto:sakayori-iroha@outlook.com', note: 'sakayori-iroha@outlook.com' },
]

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function render(lang: Lang) {
  const d = DICT[lang]

  const highlights: Section[] = [
    { title: d.focus.title, items: d.focus.items },
    { title: d.background.title, items: d.background.items },
    { title: d.principles.title, items: d.principles.items },
  ]

  const timeline: Section = { title: d.log.title, items: d.log.items }

  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) throw new Error('Missing #app')

  app.innerHTML = `
    <main class="wrap">
      <header class="hero">
        <div class="hero-left">
          <div class="topbar">
            <div class="kicker">🎵 + ⏰</div>
            <div class="lang">
              ${LANGS.map(
                (l) =>
                  `<button class="langbtn ${l.key === lang ? 'active' : ''}" data-lang="${l.key}">${escapeHtml(l.label)}</button>`
              ).join('')}
            </div>
          </div>

          <h1>${escapeHtml(d.titleName)} <span class="en">Iroha Sakayori</span></h1>
          <p class="sub">${escapeHtml(d.titleSub)}</p>

          <div class="about">
            ${d.about.map((l) => `<p>${escapeHtml(l)}</p>`).join('')}
          </div>

          <nav class="links">
            ${links
              .map(
                (l) => `
                  <a class="pill" href="${escapeHtml(l.href)}" target="_blank" rel="noreferrer">
                    <span class="pill-label">${escapeHtml(l.label)}</span>
                    ${l.note ? `<span class="pill-note">${escapeHtml(l.note)}</span>` : ''}
                  </a>
                `
              )
              .join('')}
          </nav>
        </div>

        <div class="hero-right">
          <div class="panel canvaspanel">
            <div class="panel-title">${escapeHtml(d.canvasLabel)}</div>
            <div id="scene" class="scene" aria-label="three-scene"></div>
          </div>

          <div class="panel">
            <div class="panel-title">${escapeHtml(d.quickSummary.title)}</div>
            <div class="panel-body">
              ${d.quickSummary.kv
                .map(
                  (row) => `
                    <div class="kv">
                      <span class="k">${escapeHtml(row.k)}</span>
                      <span class="v">${escapeHtml(row.v)}</span>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>

          <div class="panel minor">
            <div class="panel-title">${escapeHtml(d.availability.title)}</div>
            <div class="panel-body">${escapeHtml(d.availability.body)}</div>
          </div>
        </div>
      </header>

      <section class="grid">
        ${highlights
          .map(
            (s) => `
          <article class="card">
            <h2>${escapeHtml(s.title)}</h2>
            <ul>
              ${s.items.map((it) => `<li>${escapeHtml(it)}</li>`).join('')}
            </ul>
          </article>
        `
          )
          .join('')}

        <article class="card wide">
          <h2>${escapeHtml(timeline.title)}</h2>
          <ul class="log">
            ${timeline.items.map((it) => `<li>${escapeHtml(it)}</li>`).join('')}
          </ul>
        </article>

        <article class="card wide">
          <h2>${escapeHtml(d.contact.title)}</h2>
          <p class="muted">${escapeHtml(d.contact.body)}</p>
        </article>
      </section>

      <footer class="foot">
        <span>© ${new Date().getFullYear()} sakayori-iroha</span>
        <span class="sep">·</span>
        <a class="footlink" href="https://github.com/sakayori-iroha/sakayori-iroha.github.io" target="_blank" rel="noreferrer">${escapeHtml(
          d.footerSource
        )}</a>
      </footer>
    </main>
  `

  // wire language buttons
  app.querySelectorAll<HTMLButtonElement>('button[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-lang') as Lang
      setLang(next)
      cleanup?.()
      render(next)
    })
  })

  // mount 3D scene
  const sceneEl = app.querySelector<HTMLElement>('#scene')
  let cleanup: (() => void) | null = null
  if (sceneEl) cleanup = mountScene(sceneEl)
}

render(getInitialLang())
