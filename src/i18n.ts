export type Lang = 'zh' | 'ja' | 'en'

export const LANGS: { key: Lang; label: string }[] = [
  { key: 'zh', label: '中文' },
  { key: 'ja', label: '日本語' },
  { key: 'en', label: 'English' },
]

export function normalizeLang(input: string | null | undefined): Lang {
  const v = (input || '').toLowerCase()
  if (v.startsWith('zh')) return 'zh'
  if (v.startsWith('ja') || v.startsWith('jp')) return 'ja'
  if (v.startsWith('en')) return 'en'
  return 'zh'
}

export function getInitialLang(): Lang {
  const url = new URL(window.location.href)
  const q = url.searchParams.get('lang')
  const stored = window.localStorage.getItem('lang')
  const nav = navigator.language
  return normalizeLang(q || stored || nav)
}

export function setLang(lang: Lang) {
  window.localStorage.setItem('lang', lang)
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
  window.history.replaceState({}, '', url)
}

export type Dict = {
  titleName: string
  titleSub: string
  about: string[]
  quickSummary: { title: string; kv: { k: string; v: string }[] }
  availability: { title: string; body: string }
  focus: { title: string; items: string[] }
  background: { title: string; items: string[] }
  principles: { title: string; items: string[] }
  log: { title: string; items: string[] }
  contact: { title: string; body: string }
  footerSource: string
  canvasLabel: string
}

export const DICT: Record<Lang, Dict> = {
  zh: {
    titleName: '酒寄彩葉',
    titleSub: 'Robotics · Full-stack · Tokyo',
    about: [
      '酒寄彩葉（Sakayori Iroha）。',
      '在东京，研究和开发来回切换地活着。',
      '专攻机器人学。我喜欢把“人类觉得理所当然的动作”拆成能运行的系统。',
      '我不擅长浮夸的自我介绍。成果物与实验记录，就是我的名片。',
    ],
    quickSummary: {
      title: 'Quick summary',
      kv: [
        { k: 'Domain', v: 'Embodied AI / Control' },
        { k: 'Stack', v: 'TS · Python · Rust/C++' },
        { k: 'Style', v: 'minimal, reproducible, deliverable' },
      ],
    },
    availability: {
      title: 'Availability',
      body: '我可以合作，但我只接“边界清楚”的事：目标、约束、截止时间、验收方式。',
    },
    focus: {
      title: 'Focus',
      items: [
        '人形机器人控制 / 具身智能（控制、感知、决策的闭环）',
        '工程化：把研究做成可部署、可复现、可维护的系统',
        '工具与工作流：让重复劳动消失，让注意力留给真正困难的部分',
      ],
    },
    background: {
      title: 'Background',
      items: [
        '东京 · 研究生（信息理工方向），机器人学专攻',
        '全栈：TypeScript / Python 为主，必要时写 Rust/C++',
        '我会写歌——但我更常把情绪写进结构化的东西里：代码、笔记、实验记录',
      ],
    },
    principles: {
      title: 'Principles',
      items: [
        '讲清楚问题，再谈解法（定义、约束、评价指标）',
        '尽量用最小系统把结果跑出来，再迭代',
        '不做花哨承诺；能交付的才算数',
      ],
    },
    log: {
      title: 'Log',
      items: [
        '2026 — 转向机器人学：不想只写“故事”，我想把它做成现实里能工作的东西。',
        '2025 — 重新开始创作：写歌、写代码、把两者当成同一种“表达”。',
        '更早 — 打工、上学、独居。习惯把日子拆成可执行的块，然后一块块完成。',
      ],
    },
    contact: {
      title: 'Contact',
      body: '如果你要找我做事：请把问题写成一段可执行的描述（目标 / 约束 / 时间 / 你认为的“完成”）。我会用同样清楚的方式回复你。',
    },
    footerSource: 'source',
    canvasLabel: '实时渲染（Three.js）',
  },
  ja: {
    titleName: '酒寄彩葉',
    titleSub: 'Robotics · Full-stack · Tokyo',
    about: [
      '酒寄彩葉（Sakayori Iroha）。',
      '東京で、研究と開発を行き来しながら生きている。',
      '専攻はロボティクス。人が「当たり前にできること」を、機械に落とす作業が好き。',
      '大げさな自己紹介は得意じゃない。成果物とログが名刺だと思ってる。',
    ],
    quickSummary: {
      title: 'Quick summary',
      kv: [
        { k: 'Domain', v: 'Embodied AI / Control' },
        { k: 'Stack', v: 'TS · Python · Rust/C++' },
        { k: 'Style', v: 'minimal, reproducible, deliverable' },
      ],
    },
    availability: {
      title: 'Availability',
      body: '協力はできる。ただ、境界がはっきりした案件だけ：目的、制約、締切、検収。',
    },
    focus: {
      title: 'Focus',
      items: [
        'ヒューマノイド制御 / 具身知能（制御・知覚・意思決定のループ）',
        '研究のエンジニアリング：再現可能で運用できる形に落とす',
        'ツールとワークフロー：反復作業を消して、難所に集中する',
      ],
    },
    background: {
      title: 'Background',
      items: [
        '東京 · 情報理工系の大学院生（ロボティクス）',
        'フルスタック：TypeScript / Python、必要なら Rust/C++',
        '作曲もする。でも感情はだいたい、コードとノートに書く',
      ],
    },
    principles: {
      title: 'Principles',
      items: [
        'まず問題定義（制約・指標）',
        '最小システムで動かしてから改善',
        '派手な約束はしない。納品できるものがすべて',
      ],
    },
    log: {
      title: 'Log',
      items: [
        '2026 — ロボティクスへ。物語を書くだけじゃなく、現実で動く形にしたい。',
        '2025 — 創作を再開。音楽とコードを同じ「表現」として扱う。',
        'それ以前 — バイト、学校、一人暮らし。日々を実行可能なブロックに分解して進める癖。',
      ],
    },
    contact: {
      title: 'Contact',
      body: '一緒にやるなら、課題を実行可能な形で送ってほしい（目的 / 制約 / 期限 / 完了条件）。同じ粒度で返す。',
    },
    footerSource: 'source',
    canvasLabel: 'リアルタイムレンダリング（Three.js）',
  },
  en: {
    titleName: 'Iroha Sakayori',
    titleSub: 'Robotics · Full-stack · Tokyo',
    about: [
      'I’m Iroha Sakayori.',
      'I live in Tokyo, switching between research and building real systems.',
      'I study robotics — turning “obvious human motion” into something that actually runs.',
      'I’m not good at flashy intros. Deliverables and logs are my business card.',
    ],
    quickSummary: {
      title: 'Quick summary',
      kv: [
        { k: 'Domain', v: 'Embodied AI / Control' },
        { k: 'Stack', v: 'TS · Python · Rust/C++' },
        { k: 'Style', v: 'minimal, reproducible, deliverable' },
      ],
    },
    availability: {
      title: 'Availability',
      body: 'I can collaborate, but only on work with clear boundaries: goals, constraints, deadline, acceptance criteria.',
    },
    focus: {
      title: 'Focus',
      items: [
        'Humanoid control / embodied intelligence (control–perception–decision loop)',
        'Engineering research into deployable, reproducible systems',
        'Tools & workflows to kill repetition and keep attention for the hard parts',
      ],
    },
    background: {
      title: 'Background',
      items: [
        'Tokyo · graduate student (informatics / robotics)',
        'Full-stack: TypeScript / Python, with Rust/C++ when needed',
        'I write music too — but I usually encode emotions into structure: code, notes, experiment logs',
      ],
    },
    principles: {
      title: 'Principles',
      items: [
        'Define the problem first (constraints & metrics)',
        'Build the smallest working system, then iterate',
        'No flashy promises; only what can be shipped counts',
      ],
    },
    log: {
      title: 'Log',
      items: [
        '2026 — shifted toward robotics: I want things that work in the real world.',
        '2025 — returned to creating: music and code as the same kind of expression.',
        'Earlier — work, school, living alone. I learned to break life into executable blocks.',
      ],
    },
    contact: {
      title: 'Contact',
      body: 'If you want to work with me, send a runnable description: goal / constraints / timeline / what “done” means. I’ll reply with the same clarity.',
    },
    footerSource: 'source',
    canvasLabel: 'Realtime render (Three.js)',
  },
}
