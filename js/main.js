/* ==========================================================================
   Servitrad — interacções
   Lê o conteúdo de js/content.js (window.SERVITRAD) e monta as secções.
   ========================================================================== */
(function () {
  "use strict";

  const C = window.SERVITRAD;
  const I = window.SERVITRAD_ICONS;
  const root = document.documentElement;
  const motionOK = root.classList.contains("motion");
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const serviceById = (id) => C.servicos.find((s) => s.id === id);

  /* ---------- texto dividido em letras (títulos) ---------- */
  function splitText(el) {
    const text = el.textContent.replace(/\s+/g, " ").trim();
    let i = 0;
    // cada <br> do HTML original é mantido como quebra de linha
    const lines = el.innerHTML.split(/<br\s*\/?>/i).map((html) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent.trim().split(/\s+/).filter(Boolean).map((w) => {
        const chars = Array.from(w).map((ch) => `<span class="char" style="--i:${i++}">${esc(ch)}</span>`).join("");
        i++;
        return `<span class="word">${chars}</span>`;
      }).join(" ");
    });
    el.innerHTML = `<span class="sr-only">${esc(text)}</span><span aria-hidden="true">${lines.join("<br>")}</span>`;
  }
  if (motionOK) $$("[data-split]").forEach(splitText);

  /* ---------- SERVIÇOS ---------- */
  function renderServices() {
    const grid = $("#services-grid");
    const cols = [document.createElement("div"), document.createElement("div")];
    cols.forEach((c) => (c.className = "services__col"));
    const weight = [0, 0];
    C.servicos.forEach((s, idx) => {
      const tall = !!s.destaque;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "svc-card" + (tall ? " svc-card--tall svc-card--featured" : "");
      btn.style.setProperty("--i", idx);
      btn.dataset.service = s.id;
      btn.setAttribute("aria-haspopup", "dialog");
      btn.innerHTML = `
        <span class="svc-card__icon">${I[s.icone] || ""}</span>
        <h3>${esc(s.titulo)}</h3>
        <p>${esc(s.resumo)}</p>
        <span class="svc-card__more">Ver detalhe ${I.arrow}</span>`;
      btn.addEventListener("click", () => openService(s.id, btn));
      // equilibra as colunas: o cartão alto conta como dois
      const target = weight[0] <= weight[1] ? 0 : 1;
      weight[target] += tall ? 2 : 1;
      cols[target].appendChild(btn);
    });
    grid.append(...cols);
  }

  /* ---------- diálogo de detalhe ---------- */
  const dialog = $("#service-dialog");
  let dialogReturn = null;
  function openService(id, trigger) {
    const s = serviceById(id);
    if (!s) return;
    dialogReturn = trigger || document.activeElement;
    $("#dialog-icon").innerHTML = I[s.icone] || "";
    $("#dialog-title").textContent = s.titulo;
    $("#dialog-text").textContent = s.detalhe;
    $("#dialog-points").innerHTML = (s.pontos || []).map((p) => `<li>${I.check}<span>${esc(p)}</span></li>`).join("");
    $("#dialog-cta").dataset.serviceCta = s.id;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDialog() {
    if (dialog.open) dialog.close ? dialog.close() : dialog.removeAttribute("open");
  }
  $("[data-close]", dialog).innerHTML = I.close;
  $("[data-close]", dialog).addEventListener("click", closeDialog);
  dialog.addEventListener("click", (e) => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener("close", () => { if (dialogReturn && dialogReturn.focus) dialogReturn.focus({ preventScroll: true }); });

  /* Qualquer [data-service-cta] pré-selecciona o serviço no formulário. */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-service-cta]");
    if (!a) return;
    const id = a.dataset.serviceCta;
    if (id) Booking.preselect(id);
    if (dialog.contains(a)) { dialogReturn = null; closeDialog(); }
  });

  /* ---------- EQUIPAMENTO ---------- */
  function renderEquipment() {
    const items = C.equipamento || [];
    const grid = $("#equipment-grid");
    if (!items.length) { $("#equipamento").hidden = true; $$('a[href="#equipamento"]').forEach((a) => a.closest("li")?.remove()); return; }
    if (items.some((i) => i.exemplo)) $("#equipment-notice").hidden = false;

    grid.innerHTML = items.map((it, idx) => `
      <li class="eq-card" data-cat="${esc(it.categoria)}" style="--i:${idx}">
        <div class="eq-card__media">
          ${it.exemplo ? '<span class="badge badge--example">Exemplo</span>' : ""}
          ${it.imagem ? `<img src="${esc(it.imagem)}" alt="${esc(it.alt || it.nome)}" loading="lazy">` : I[it.icone] || ""}
        </div>
        <div class="eq-card__body">
          <span class="eq-card__cat">${esc(it.categoria)}</span>
          <h3>${esc(it.nome)}</h3>
          <p>${esc(it.texto)}</p>
          <span class="eq-card__avail">Disponibilidade sob consulta</span>
        </div>
      </li>`).join("");

    const cats = ["Todos", ...new Set(items.map((i) => i.categoria))];
    const filters = $("#equipment-filters");
    filters.innerHTML = cats.map((c, i) => `<button type="button" class="filter" aria-pressed="${i === 0}" data-filter="${esc(c)}">${esc(c)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((f) => f.setAttribute("aria-pressed", f === b));
      const cat = b.dataset.filter;
      let n = 0;
      $$(".eq-card", grid).forEach((card) => {
        const show = cat === "Todos" || card.dataset.cat === cat;
        card.hidden = !show;
        if (show && motionOK) {
          card.style.setProperty("--i", n++);
          card.classList.remove("is-visible");
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("is-visible")));
        }
      });
    });
  }

  /* ---------- COMO FUNCIONA (faixa horizontal) ---------- */
  function renderSteps() {
    const track = $("#steps-track");
    const steps = C.etapas || [];
    track.innerHTML = steps.map((s, i) => `
      <li class="step${i === steps.length - 1 ? " step--final" : ""}" style="--i:${i}">
        <span class="step__num"><b>${String(i + 1).padStart(2, "0")}</b> Etapa ${i + 1} de ${steps.length}</span>
        <h3>${esc(s.titulo)}</h3>
        <p>${esc(s.texto)}</p>
        ${s.quem ? `<span class="step__chip"><span>${i === steps.length - 1 ? I.check : I.arrow}</span><span>Responsável<strong>${esc(s.quem)}</strong></span></span>` : ""}
      </li>`).join("");

    const prev = $("[data-steps-prev]");
    const next = $("[data-steps-next]");
    const bar = $("#steps-progress");
    prev.innerHTML = I.arrowLeft;
    next.innerHTML = I.arrow;
    const items = $$(".step", track);
    const stepWidth = () => (items[1] ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth);
    const behavior = motionOK ? "smooth" : "auto";
    const go = (dir) => track.scrollBy({ left: dir * stepWidth(), behavior });

    function update() {
      const max = track.scrollWidth - track.clientWidth;
      const x = track.scrollLeft;
      prev.disabled = x <= 2;
      next.disabled = x >= max - 2;
      bar.style.width = (max > 0 ? Math.min(100, ((x + track.clientWidth) / track.scrollWidth) * 100) : 100) + "%";
      const idx = Math.round(x / stepWidth());
      items.forEach((it, i) => it.classList.toggle("is-current", i === Math.min(idx, items.length - 1)));
    }
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "Home") { e.preventDefault(); track.scrollTo({ left: 0, behavior }); }
      if (e.key === "End") { e.preventDefault(); track.scrollTo({ left: track.scrollWidth, behavior }); }
    });

    /* arrastar com o rato (o toque usa o scroll nativo) */
    let drag = null;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false };
      track.style.scrollSnapType = "none";
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      track.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!drag) return;
      track.style.scrollSnapType = "";
      drag = null;
    });
    update();
  }

  /* ---------- FAQ ---------- */
  function renderFaq() {
    const list = $("#faq-list");
    const items = (C.faq || []).filter((f) => f.publicado !== false);
    if (!items.length) { $("#faq").hidden = true; return; }
    list.innerHTML = items.map((f, i) => `
      <div class="faq-item${i === 0 ? " is-open" : ""}" style="--i:${i}">
        <h3><button class="faq-item__q" type="button" id="faq-q-${i}" aria-expanded="${i === 0}" aria-controls="faq-a-${i}">
          <span>${esc(f.pergunta)}</span><span class="faq-item__icon" aria-hidden="true"></span>
        </button></h3>
        <div class="faq-item__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"${i === 0 ? "" : " inert"}><div><p>${esc(f.resposta)}</p></div></div>
      </div>`).join("");

    const setOpen = (item, open) => {
      item.classList.toggle("is-open", open);
      $(".faq-item__q", item).setAttribute("aria-expanded", open);
      $(".faq-item__a", item).inert = !open;
    };
    list.addEventListener("click", (e) => {
      const q = e.target.closest(".faq-item__q");
      if (!q) return;
      const item = q.closest(".faq-item");
      const willOpen = !item.classList.contains("is-open");
      $$(".faq-item", list).forEach((it) => setOpen(it, it === item ? willOpen : false));
    });
    list.addEventListener("keydown", (e) => {
      const qs = $$(".faq-item__q", list);
      const i = qs.indexOf(document.activeElement);
      if (i < 0) return;
      const map = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: qs.length - 1 };
      if (e.key in map) { e.preventDefault(); qs[(map[e.key] + qs.length) % qs.length].focus(); }
    });
  }

  /* ---------- ARTIGOS ---------- */
  function renderArticles() {
    let items = (C.artigos || []).filter((a) => a.publicado !== false);
    const preview = new URLSearchParams(location.search).get("preview") === "artigos";
    if (!items.length && preview) {
      items = [
        { titulo: "Título do artigo (exemplo de layout)", resumo: "Resumo curto do artigo. Este cartão só aparece em modo de pré-visualização.", etiqueta: "Exemplo", url: "#guias" },
        { titulo: "Segundo artigo (exemplo de layout)", resumo: "Substitua por artigos reais em js/content.js para publicar esta secção.", etiqueta: "Exemplo", url: "#guias" },
      ];
      $("#articles-preview-note").hidden = false;
    }
    if (!items.length) return; // secção permanece oculta
    $("#guias").hidden = false;
    const fmt = (d) => { try { return new Date(d).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" }); } catch { return ""; } };
    $("#articles-grid").innerHTML = items.map((a, i) => `
      <a class="article-card" href="${esc(a.url || "#")}" style="--i:${i}">
        <div class="article-card__media">
          ${a.etiqueta ? `<span class="badge">${esc(a.etiqueta)}</span>` : ""}
          ${a.imagem ? `<img src="${esc(a.imagem)}" alt="" loading="lazy">` : ""}
        </div>
        ${a.data ? `<time datetime="${esc(a.data)}" class="eq-card__cat">${esc(fmt(a.data))}</time>` : ""}
        <h3>${esc(a.titulo)}</h3>
        <p>${esc(a.resumo)}</p>
      </a>`).join("");
  }

  /* ---------- RODAPÉ ---------- */
  function renderFooter() {
    const k = C.contactos;
    $("#year").textContent = C.empresa.ano;
    $("#company-name").textContent = C.empresa.nome;
    $("#footer-services").innerHTML = C.servicos.map((s) => `<li><a href="#servicos" data-open-service="${esc(s.id)}">${esc(s.titulo)}</a></li>`).join("");
    $("#footer-services").addEventListener("click", (e) => {
      const a = e.target.closest("[data-open-service]");
      if (a) { e.preventDefault(); openService(a.dataset.openService, a); }
    });
    const rows = [];
    (k.telefones || []).forEach((t) => {
      const isWa = /whatsapp/i.test(t.rotulo) && k.whatsapp;
      const href = isWa ? `https://wa.me/${esc(k.whatsapp)}` : `tel:${esc(t.link)}`;
      rows.push(`<li>${isWa ? I.chat : I.phone}<a href="${href}"${isWa ? ' target="_blank" rel="noopener"' : ""}><span class="sr-only">${esc(t.rotulo)}: </span>${esc(t.numero)}</a></li>`);
    });
    if (k.email) rows.push(`<li>${I.mail}<a href="mailto:${esc(k.email)}">${esc(k.email)}</a></li>`);
    if (k.localizacao) rows.push(`<li>${I.pin}<span>${esc(k.localizacao)}</span></li>`);
    if (k.horario) rows.push(`<li><span>${esc(k.horario)}</span></li>`);
    if (!k.confirmados) rows.push(`<li><span class="note">Contactos a confirmar</span></li>`);
    $("#footer-contacts").innerHTML = rows.join("");
    $("#footer-socials").innerHTML = (k.redes || []).map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nome)} ${I.external}</a></li>`).join("");
    const wa = $("#footer-whatsapp");
    if (k.whatsapp) wa.href = `https://wa.me/${k.whatsapp}`; else wa.remove();
  }

  /* ==========================================================================
     FORMULÁRIO DE AGENDAMENTO
     ========================================================================== */
  const Booking = (() => {
    const form = $("#booking-form");
    const steps = $$(".form-step", form);
    const labels = ["Serviço", "Data e local", "Detalhes", "Contacto", "Revisão"];
    const stepper = $("#stepper");
    const btnPrev = $("[data-prev]", form);
    const btnNext = $("[data-next]", form);
    const btnSubmit = $("[data-submit]", form);
    const status = $("#form-status");
    const result = $("#form-result");
    const endpoint = (C.formulario && C.formulario.endpoint || "").trim();
    let current = 0;
    let startedAt = Date.now();

    if (!endpoint) $("#demo-banner").hidden = false;

    $("#service-choices").innerHTML = C.servicos.map((s) => `
      <label class="choice"><input type="radio" name="servico" value="${esc(s.titulo)}" data-id="${esc(s.id)}" required>${I[s.icone] || ""}<span>${esc(s.titulo)}</span></label>`).join("") +
      `<label class="choice"><input type="radio" name="servico" value="Vários serviços / outro" data-id="outro">${I.conferencia}<span>Vários serviços ou outro</span></label>`;

    stepper.innerHTML = labels.map((l, i) => `<li${i === 0 ? ' class="is-active" aria-current="step"' : ""}>${l}</li>`).join("");

    const today = new Date();
    const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $("#f-data").min = iso(today);

    function setError(name, msg) {
      const p = $(`[data-error-for="${name}"]`, form);
      if (p) p.textContent = msg || "";
      $$(`[name="${name}"]`, form).forEach((el) => {
        if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
        if (p) { p.id = p.id || `err-${name}`; if (msg) el.setAttribute("aria-describedby", p.id); else el.removeAttribute("aria-describedby"); }
      });
      return !msg;
    }

    function validate(i) {
      const f = form.elements;
      const errs = [];
      const check = (name, msg) => { if (!setError(name, msg)) errs.push(name); };
      if (i === 0) check("servico", form.querySelector('[name="servico"]:checked') ? "" : "Escolha um serviço.");
      if (i === 1) {
        const v = f.data.value;
        check("data", !v ? "Indique a data pretendida." : v < f.data.min ? "Escolha uma data a partir de hoje." : "");
        check("modalidade", form.querySelector('[name="modalidade"]:checked') ? "" : "Escolha a modalidade.");
        const a = f.horaInicio.value, b = f.horaFim.value;
        check("horaFim", a && b && b <= a ? "A hora de fim deve ser depois da hora de início." : "");
      }
      if (i === 3) {
        check("nome", f.nome.value.trim().length < 2 ? "Indique o seu nome." : "");
        check("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? "" : "Indique um email válido.");
        const t = f.telefone.value.trim();
        check("telefone", t && !/^[+\d][\d\s()-]{6,}$/.test(t) ? "Indique um número válido (só algarismos, espaços e +)." : "");
        check("consentimento", f.consentimento.checked ? "" : "É necessário o seu consentimento para o contactarmos.");
      }
      if (errs.length) {
        const first = form.querySelector(`[name="${errs[0]}"]`);
        first && first.focus();
      }
      return !errs.length;
    }

    function data() {
      const f = new FormData(form);
      return {
        servico: f.get("servico") || "",
        data: f.get("data") || "",
        horaInicio: f.get("horaInicio") || "",
        horaFim: f.get("horaFim") || "",
        modalidade: f.get("modalidade") || "",
        local: (f.get("local") || "").trim(),
        participantes: f.get("participantes") || "",
        idiomas: (f.get("idiomas") || "").trim(),
        requisitos: f.getAll("requisitos"),
        observacoes: (f.get("observacoes") || "").trim(),
        nome: (f.get("nome") || "").trim(),
        organizacao: (f.get("organizacao") || "").trim(),
        email: (f.get("email") || "").trim(),
        telefone: (f.get("telefone") || "").trim(),
        consentimento: f.get("consentimento") === "sim",
      };
    }

    const fmtDate = (v) => { if (!v) return ""; const [y, m, d] = v.split("-"); return `${d}/${m}/${y}`; };
    function rows(d) {
      const hora = [d.horaInicio, d.horaFim].filter(Boolean).join(" – ");
      return [
        ["Serviço", d.servico],
        ["Data", fmtDate(d.data) + (hora ? `, ${hora}` : "")],
        ["Modalidade", d.modalidade],
        ["Local", d.local],
        ["Dimensão", d.participantes],
        ["Idiomas", d.idiomas],
        ["Requisitos", d.requisitos.join(", ")],
        ["Observações", d.observacoes],
        ["Nome", d.nome],
        ["Organização", d.organizacao],
        ["Email", d.email],
        ["Telefone", d.telefone],
      ].filter(([, v]) => v);
    }

    function show(i) {
      steps.forEach((s, n) => { s.hidden = n !== i; s.classList.toggle("is-entering", n === i && motionOK); });
      $$("li", stepper).forEach((li, n) => {
        li.classList.toggle("is-active", n === i);
        li.classList.toggle("is-done", n < i);
        if (n === i) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
      });
      btnPrev.hidden = i === 0;
      btnNext.hidden = i === steps.length - 1;
      btnSubmit.hidden = i !== steps.length - 1;
      if (i === steps.length - 1) {
        $("#summary").innerHTML = rows(data()).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
      }
      status.textContent = "";
      current = i;
    }
    const focusStep = () => { const l = $("legend", steps[current]); l.tabIndex = -1; l.focus({ preventScroll: false }); };

    btnNext.addEventListener("click", () => { if (validate(current)) { show(current + 1); focusStep(); } });
    btnPrev.addEventListener("click", () => { show(current - 1); focusStep(); });
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.type !== "submit" && e.target.tagName !== "BUTTON") {
        e.preventDefault();
        if (current < steps.length - 1) btnNext.click();
      }
    });
    form.addEventListener("change", (e) => { if (e.target.name) setError(e.target.name, ""); });

    const reference = () => {
      const d = new Date();
      return `ST-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    };
    const summaryText = (d, ref) => `Pedido de serviço — ${ref}\n\n` + rows(d).map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\n(Pedido sujeito a confirmação da Servitrad.)";

    function showResult(html) {
      form.hidden = true; stepper.hidden = true;
      result.innerHTML = html;
      result.hidden = false;
      result.focus();
      $("[data-restart]", result)?.addEventListener("click", restart);
    }
    function restart() {
      form.reset(); result.hidden = true; form.hidden = false; stepper.hidden = false;
      startedAt = Date.now(); show(0); focusStep();
    }

    function fallbackButtons(d, ref) {
      const k = C.contactos;
      const text = summaryText(d, ref);
      const mail = k.email ? `<a class="btn btn--primary" href="mailto:${esc(k.email)}?subject=${encodeURIComponent("Pedido de serviço " + ref)}&body=${encodeURIComponent(text)}">${I.mail} Enviar por email</a>` : "";
      const wa = k.whatsapp ? `<a class="btn btn--ghost" href="https://wa.me/${esc(k.whatsapp)}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">${I.chat} Enviar por WhatsApp</a>` : "";
      return mail + wa;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      for (let i = 0; i < steps.length - 1; i++) if (!validate(i)) { show(i); return; }
      if (form.elements.website.value) return; // honeypot: bot
      const minMs = ((C.formulario && C.formulario.tempoMinimoSegundos) || 0) * 1000;
      if (Date.now() - startedAt < minMs) { status.textContent = "Envio demasiado rápido. Reveja o pedido e tente novamente."; return; }

      const d = data();
      const ref = reference();

      if (!endpoint) {
        showResult(`
          <span class="form-result__icon form-result__icon--warn">${I.mail}</span>
          <h3>O pedido ainda não foi enviado</h3>
          <p>O envio online está em modo de demonstração e <strong>nada foi guardado</strong>. Para concluir, envie o resumo (referência <strong>${esc(ref)}</strong>) por um dos canais abaixo.</p>
          <div class="form-result__actions">${fallbackButtons(d, ref)}</div>
          <p><button class="btn btn--ghost" type="button" data-restart>Fazer outro pedido</button></p>`);
        return;
      }

      btnSubmit.disabled = true; btnPrev.disabled = true;
      status.style.color = "var(--ink-soft)";
      status.textContent = "A enviar…";
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ referencia: ref, estado: "Pedido enviado", ...d, requisitos: d.requisitos.join(", "), enviadoEm: new Date().toISOString(), pagina: location.href.split("?")[0] }),
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        showResult(`
          <span class="form-result__icon">${I.check}</span>
          <h3>Pedido recebido</h3>
          <p>Obrigado, ${esc(d.nome.split(" ")[0])}. A sua referência é <strong>${esc(ref)}</strong>. Vai receber uma confirmação de recepção em <strong>${esc(d.email)}</strong>.</p>
          <ol class="status-list" aria-label="Estado do pedido">
            <li class="is-done"><span></span>Pedido enviado</li>
            <li><span></span>Em análise</li><li><span></span>Proposta enviada</li><li><span></span>Confirmado</li><li><span></span>Concluído</li>
          </ol>
          <p>A data não está reservada até a Servitrad confirmar a disponibilidade.</p>
          <p><button class="btn btn--ghost" type="button" data-restart>Fazer outro pedido</button></p>`);
      } catch (err) {
        status.style.color = "";
        status.innerHTML = `Não foi possível enviar o pedido. Tente novamente ou use: <span class="form-result__actions" style="margin-top:10px">${fallbackButtons(d, ref)}</span>`;
      } finally {
        btnSubmit.disabled = false; btnPrev.disabled = false;
      }
    });

    show(0);
    return {
      preselect(id) {
        const input = form.querySelector(`[name="servico"][data-id="${CSS.escape(id)}"]`);
        if (input && !form.hidden) { input.checked = true; setError("servico", ""); }
      },
    };
  })();

  /* ==========================================================================
     NAVEGAÇÃO
     ========================================================================== */
  function initNav() {
    const header = $(".site-header");
    const toggle = $(".nav-toggle");
    const nav = $("#main-nav");
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", open);
      $(".sr-only", toggle).textContent = open ? "Fechar menu" : "Abrir menu";
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); } });
    matchMedia("(min-width: 961px)").addEventListener("change", (m) => m.matches && setOpen(false));

    const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const links = $$('.main-nav ul a[href^="#"]');
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.removeAttribute("aria-current"));
        map.get(en.target.id)?.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
  }

  /* ==========================================================================
     ANIMAÇÃO: entrada por scroll, hero e parallax
     ========================================================================== */
  function initReveal() {
    if (!motionOK) return;
    const targets = [
      ...$$("[data-reveal]"), ...$$(".services__col"), ...$$(".eq-card"),
      $(".steps"), $("#faq-list"), $("#articles-grid"),
      ...$$("[data-split]").filter((el) => !el.closest(".hero")),
    ].filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("is-visible");
        if (el.hasAttribute("data-split")) el.classList.add("is-split-in");
        // os cartões usam clip-path (invisíveis ao observer): revela-se a coluna inteira
        $$(".svc-card", el).forEach((card) => {
          card.classList.add("is-visible");
          if (card.classList.contains("svc-card--featured")) setTimeout(() => card.classList.add("is-filled"), 1100);
        });
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    targets.forEach((t) => io.observe(t));
  }

  function initHero() {
    const hero = $(".hero");
    const decos = $$(".hero__deco .deco");
    decos.forEach((d, i) => d.style.setProperty("--d", i));
    const title = $(".hero__title");
    const ready = () => { hero.classList.add("is-ready"); title.classList.add("is-split-in"); };
    if (!motionOK) return;
    (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]) : Promise.resolve())
      .then(() => requestAnimationFrame(ready));

    const orb = $("[data-hero-orb]");
    let mx = 0, my = 0, tx = 0, ty = 0, raf = 0, inView = true;
    new IntersectionObserver(([en]) => { inView = en.isIntersecting; if (inView) tick(); }).observe(hero);

    if (matchMedia("(pointer: fine)").matches) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
        tick();
      });
      hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; tick(); });
    }
    addEventListener("scroll", () => inView && tick(), { passive: true });

    function frame() {
      raf = 0;
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;
      const p = Math.min(1, Math.max(0, scrollY / Math.max(1, hero.offsetHeight)));
      // a ilustração "ganha presença" ao descer: cresce ligeiramente e roda pouco
      orb.style.transform = `translate3d(${mx * 14}px, ${p * 70 + my * 10}px, 0) scale(${1 + p * 0.14}) rotate(${p * -5 + mx * 2}deg)`;
      decos.forEach((d) => {
        const depth = parseFloat(d.dataset.depth || 0.5);
        const float = parseFloat(d.dataset.float || -60);
        d.style.transform = `translate3d(${mx * depth * 46}px, ${p * float + my * depth * 34}px, 0) rotate(${p * float * 0.25}deg)`;
      });
      if (Math.abs(tx - mx) > 0.002 || Math.abs(ty - my) > 0.002) tick();
    }
    function tick() { if (!raf) raf = requestAnimationFrame(frame); }
    tick();
  }

  /* ---------- arranque ---------- */
  $(".hero__explore-icon").innerHTML = I.arrowDown;
  renderServices();
  renderEquipment();
  renderSteps();
  renderFaq();
  renderArticles();
  renderFooter();
  initNav();
  initHero();
  initReveal();
})();
