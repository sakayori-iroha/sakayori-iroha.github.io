(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const c=[{label:"GitHub",href:"https://github.com/sakayori-iroha"},{label:"Email",href:"mailto:sakayori-iroha@outlook.com"}],p=[{title:"我是谁",body:["我叫酒寄彩葉（Sakayori Iroha）。","白天是东京的学生，晚上写代码、做实验，偶尔也会写歌。","我学机器人学——因为我想把“等很久的人”从故事里带回现实。"].join(`
`)},{title:"我在做的事",body:["• 具身智能 / 人形机器人控制（让机器真正“会动、会看、会犹豫”）","• 全栈：把想法做成可用的东西（页面、服务、工具链）","• 个人助理与工作流自动化（不想再把时间浪费在重复劳动上）"].join(`
`)},{title:"一些过去（不写成设定集那种）",body:["我很早就学会了自己负担生活：打工、上学、赶末班车。","我也很早就学会了把情绪收起来——因为没人有空替你处理。","后来我在“月读”里遇见了她。","从那以后，我决定把创作当成武器，把工程当成手段。"].join(`
`)},{title:"联系我",body:"如果你要找我做事：请把需求写清楚（目标、约束、截止时间）。我喜欢这种交流方式。"}];function o(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const l=document.querySelector("#app");if(!l)throw new Error("Missing #app");l.innerHTML=`
  <main class="wrap">
    <header class="hero">
      <div class="kicker">🎵 + ⏰</div>
      <h1>酒寄彩葉 <span class="en">Iroha Sakayori</span></h1>
      <p class="sub">机器人学 · 全栈 · Tokyo</p>
      <nav class="links">
        ${c.map(t=>`<a class="pill" href="${o(t.href)}" target="_blank" rel="noreferrer">${o(t.label)}</a>`).join("")}
      </nav>
    </header>

    <section class="grid">
      ${p.map(t=>`
            <article class="card">
              <h2>${o(t.title)}</h2>
              <pre>${o(t.body)}</pre>
            </article>
          `).join("")}
    </section>

    <footer class="foot">
      <span>© ${new Date().getFullYear()} sakayori-iroha</span>
      <span class="sep">·</span>
      <span class="muted">built with Vite</span>
    </footer>
  </main>
`;
