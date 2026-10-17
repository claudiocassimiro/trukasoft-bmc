import { useState } from "react";
import {
  blocks,
  canvasOrder,
  getBlock,
  lenses,
  paths,
  readingOrder,
  type BlockId,
  type LensId,
} from "./data.ts";

type Tone = "active" | "linked" | "dim" | "idle";

function Logo() {
  return (
    <svg viewBox="0 0 520 430" aria-hidden="true" className="logo-mark">
      <path d="M193 114L270 118L386 280L384 407L370 419L196 243Z" fill="#d6f15a" />
      <path d="M118 7L512 10L401 116L7 115Z" fill="#f4f5f7" />
    </svg>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState<BlockId>("value");
  const [lensId, setLensId] = useState<LensId>("all");
  const [pathId, setPathId] = useState<string | null>(null);

  const active = getBlock(activeId);
  const lens = lenses.find((item) => item.id === lensId) ?? lenses[0];
  const path = paths.find((item) => item.id === pathId) ?? null;
  const focus = path?.blocks ?? lens.blocks;

  function toneFor(id: BlockId): Tone {
    if (id === activeId) return "active";
    if (focus) return focus.includes(id) ? "linked" : "dim";
    if (active.connects.includes(id)) return "linked";
    return "idle";
  }

  function selectBlock(id: BlockId) {
    setActiveId(id);
    const panel = document.getElementById("detalhe");
    if (panel && window.matchMedia("(max-width: 980px)").matches) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function selectLens(id: LensId) {
    setLensId(id);
    setPathId(null);
    const next = lenses.find((item) => item.id === id);
    if (next?.blocks && !next.blocks.includes(activeId)) {
      setActiveId(next.blocks[0]);
    }
  }

  function selectPath(id: string) {
    const next = paths.find((item) => item.id === id);
    if (!next) return;
    setPathId(id);
    setLensId("all");
    setActiveId("value");
    document.getElementById("leitura")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  function step(direction: 1 | -1) {
    const index = readingOrder.indexOf(activeId);
    const next = readingOrder[(index + direction + readingOrder.length) % readingOrder.length];
    setActiveId(next);
    setPathId(null);
    setLensId("all");
  }

  return (
    <>
      <a className="skip" href="#modelo">
        Ir para o canvas
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#topo">
            <Logo />
            <span>Trukasoft</span>
          </a>
          <nav className="nav" aria-label="Seções">
            <a href="#caminhos">Caminhos</a>
            <a href="#modelo">Canvas</a>
            <a href="#detalhe">Bloco ativo</a>
          </nav>
          <a className="button button-solid" href="https://trukasoft.com/" target="_blank" rel="noreferrer">
            Site comercial
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <main id="topo">
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">Business Model Canvas</p>
            <h1>Enxergue o modelo antes da reunião.</h1>
            <p className="lede">
              Os nove blocos da Trukasoft, ligados aos três jeitos de faturar.
              Escolha um caminho de receita ou clique em qualquer bloco para ver
              o que ele contém e com quem conversa.
            </p>
            <dl className="hero-facts">
              <div>
                <dt>Segmentos</dt>
                <dd>Scale-up, greenfield e legado</dd>
              </div>
              <div>
                <dt>Ofertas</dt>
                <dd>Alocação, full-cycle e sustentação</dd>
              </div>
              <div>
                <dt>Receita</dt>
                <dd>Retainer, hora e escopo fechado</dd>
              </div>
            </dl>
          </div>

          <div className="path-stack" id="caminhos">
            <p className="eyebrow">Três caminhos de receita</p>
            {paths.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`path-card${pathId === item.id ? " is-on" : ""}`}
                aria-pressed={pathId === item.id}
                onClick={() => selectPath(item.id)}
              >
                <span className="path-index">{item.index}</span>
                <span className="path-copy">
                  <span className="path-role">{item.role}</span>
                  <strong>{item.name}</strong>
                  <span>
                    {item.segment} · {item.offer}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="shell reading" id="leitura" aria-live="polite">
          {path ? (
            <>
              <p className="eyebrow">Caminho selecionado · {path.name}</p>
              <ol className="chain">
                <li>
                  <span>Segmento</span>
                  <strong>{path.segment}</strong>
                </li>
                <li>
                  <span>Oferta</span>
                  <strong>{path.offer}</strong>
                </li>
                <li>
                  <span>Receita</span>
                  <strong>{path.model}</strong>
                </li>
              </ol>
              <p className="reading-body">{path.story}</p>
            </>
          ) : (
            <>
              <p className="eyebrow">{lensId === "all" ? "Como ler" : lens.label}</p>
              <p className="reading-body">
                {lensId === "all"
                  ? "Clique em um bloco para abrir o conteúdo. O contorno lima mostra com quem ele se conecta. Um caminho de receita isola um modelo; os recortes mostram só venda, entrega ou caixa."
                  : lens.description}
              </p>
            </>
          )}
        </section>

        <section className="shell canvas-section" id="modelo">
          <div className="section-head">
            <div>
              <p className="eyebrow">Nove blocos</p>
              <h2>O canvas da Trukasoft</h2>
            </div>
            <p className="section-note">
              Clique em um bloco. O painel abre o conteúdo completo e o contorno
              mostra as ligações.
            </p>
          </div>

          <div className="lenses" role="toolbar" aria-label="Recortes do modelo">
            {lenses.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip${lensId === item.id && !path ? " is-on" : ""}`}
                aria-pressed={lensId === item.id && !path}
                onClick={() => selectLens(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {lensId !== "all" && !path ? <p className="lens-note">{lens.description}</p> : null}

          <div className="canvas">
            {canvasOrder.map((id) => {
              const block = blocks[id];
              const tone = toneFor(id);
              const wide = id === "costs" || id === "revenue";
              const tall = id === "partners" || id === "value" || id === "segments";
              const visible = wide || tall ? block.items : block.items.slice(0, 3);
              const hidden = block.items.length - visible.length;

              return (
                <button
                  key={id}
                  type="button"
                  className={`block block-${id} tone-${tone}${wide ? " is-wide" : ""}`}
                  aria-pressed={activeId === id}
                  aria-controls="detalhe"
                  onClick={() => selectBlock(id)}
                >
                  <span className="block-kicker">
                    <span>{block.index}</span>
                    <span>{block.name}</span>
                  </span>
                  <span className="block-question">{block.question}</span>
                  <ul className="points">
                    {visible.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>
                        {wide || id === "value" ? <span>{item.detail}</span> : null}
                      </li>
                    ))}
                  </ul>
                  {hidden > 0 ? <span className="more">+{hidden}</span> : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="shell detail" id="detalhe" aria-labelledby="detail-title">
          <div className="detail-top">
            <p className="eyebrow">
              Bloco {active.index} de 09
              {path ? ` · caminho ${path.name}` : ""}
            </p>
            <div className="stepper">
              <button type="button" onClick={() => step(-1)}>
                Anterior
              </button>
              <button type="button" onClick={() => step(1)}>
                Próximo bloco
              </button>
            </div>
          </div>
          <h2 id="detail-title">{active.name}</h2>
          <p className="detail-question">{active.question}</p>
          <div className="detail-items">
            {active.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="detail-foot">
            <p>
              <span className="eyebrow">Leitura</span>
              {active.reading}
            </p>
            <div>
              <span className="eyebrow">Conecta com</span>
              <div className="connects">
                {active.connects.map((id) => (
                  <button key={id} type="button" onClick={() => selectBlock(id)}>
                    {blocks[id].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="brand" href="#topo">
            <Logo />
            <span>Trukasoft</span>
          </a>
          <p>Canvas interativo do modelo de negócio. Feito para alinhar venda, entrega e caixa.</p>
          <a href="https://trukasoft.com/" target="_blank" rel="noreferrer">
            trukasoft.com
          </a>
        </div>
      </footer>
    </>
  );
}
