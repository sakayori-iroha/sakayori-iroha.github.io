import './style.css'

type Link = { label: string; href: string; note?: string }

type Section = {
  title: string
  items: string[]
}

const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/sakayori-iroha', note: '@sakayori-iroha' },
  { label: 'Email', href: 'mailto:sakayori-iroha@outlook.com', note: 'sakayori-iroha@outlook.com' },
]

const about = [
  '酒寄彩葉（Sakayori Iroha）。',
  '東京で、研究と開発を行き来しながら生きている。',
  '専攻はロボティクス。人が「当たり前にできること」を、機械に落とす作業が好き。',
  '派手な自己紹介は得意じゃない。成果物と、手元のログが自分の名刺だと思ってる。',
]

const highlights: Section[] = [
  {
    title: 'Focus',
    items: [
      '人形机器人控制 / 具身智能（控制、感知、决策的闭环）',
      '工程化：把研究做成可部署、可复现、可维护的系统',
      '工具与工作流：让重复劳动消失，让注意力留给真正困难的部分',
    ],
  },
  {
    title: 'Background',
    items: [
      '东京 · 研究生（信息理工方向），机器人学专攻',
      '全栈：TypeScript / Python 为主，必要时写 Rust/C++',
      '我会写歌——但我更常把情绪写进结构化的东西里：代码、笔记、实验记录',
    ],
  },
  {
    title: 'Principles',
    items: [
      '讲清楚问题，再谈解法（定义、约束、评价指标）',
      '尽量用最小的系统把结果跑出来，再迭代',
      '不做花哨承诺；能交付的才算数',
    ],
  },
]

const timeline: Section = {
  title: 'Log',
  items: [
    '2026 — 转向机器人学：不想只写“故事”，我想把它做成现实里能工作的东西。',
    '2025 — 重新开始创作：写歌、写代码、把两者当成同一种“表达”。',
    '更早 — 打工、上学、独居。习惯把日子拆成可执行的块，然后一块块完成。',
  ],
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

app.innerHTML = `
  <main class="wrap">
    <header class="hero">
      <div class="hero-left">
        <div class="kicker">🎵 + ⏰</div>
        <h1>酒寄彩葉 <span class="en">Iroha Sakayori</span></h1>
        <p class="sub">Robotics · Full-stack · Tokyo</p>
        <div class="about">
          ${about.map((l) => `<p>${escapeHtml(l)}</p>`).join('')}
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
        <div class="panel">
          <div class="panel-title">Quick summary</div>
          <div class="panel-body">
            <div class="kv"><span class="k">Domain</span><span class="v">Embodied AI / Control</span></div>
            <div class="kv"><span class="k">Stack</span><span class="v">TS · Python · Rust/C++</span></div>
            <div class="kv"><span class="k">Style</span><span class="v">minimal, reproducible, deliverable</span></div>
          </div>
        </div>
        <div class="panel minor">
          <div class="panel-title">Availability</div>
          <div class="panel-body">
            我可以合作，但我只接“边界清楚”的事：目标、约束、截止时间、验收方式。
          </div>
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
        <h2>Contact</h2>
        <p class="muted">
          如果你要找我做事：请把问题写成一段可执行的描述（目标 / 约束 / 时间 / 你认为的“完成”）。
          我会用同样清楚的方式回复你。
        </p>
      </article>
    </section>

    <footer class="foot">
      <span>© ${new Date().getFullYear()} sakayori-iroha</span>
      <span class="sep">·</span>
      <a class="footlink" href="https://github.com/sakayori-iroha/sakayori-iroha.github.io" target="_blank" rel="noreferrer">source</a>
    </footer>
  </main>
`
