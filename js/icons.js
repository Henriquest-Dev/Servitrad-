/* Ícones dos serviços (cópia inline de assets/icones/*.svg) e ícones de interface.
   Inline para poderem herdar a cor (currentColor) nos estados hover/destaque. */
(function () {
  const svc = (body) =>
    `<svg class="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="svc-icon__ring" cx="12" cy="12" r="11"/><g>${body}</g><circle class="svc-icon__dot" cx="20" cy="5" r="1.5" stroke="none"/></svg>`;
  const ui = (body, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

  window.SERVITRAD_ICONS = {
    traducao: svc('<path d="M8 3h10l5 5v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M18 3v6h6M10 13h8M10 17h5"/><path d="M4 9H2m0 0 2-2M2 9l2 2"/>'),
    interpretacao: svc('<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 20c-1 2-3 2-5 2M14 22h-2"/>'),
    conferencia: svc('<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v3m-4 0h8"/><path d="M3 6v2m18-2v2"/>'),
    videoconferencia: svc('<rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3M7 9h6M7 13h4"/>'),
    som: svc('<path d="M4 10v4h4l5 4V6l-5 4H4Z"/><path d="M17 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12"/><circle cx="5" cy="20" r="1"/>'),

    arrow: ui('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    arrowDown: ui('<path d="M7 7l10 10M17 9v8H9"/>'),
    arrowLeft: ui('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    close: ui('<path d="M6 6l12 12M18 6 6 18"/>'),
    check: ui('<path d="m5 12 5 5L20 7"/>'),
    phone: ui('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
    mail: ui('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    pin: ui('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>'),
    chat: ui('<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12Z"/>'),
    external: ui('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  };
})();
