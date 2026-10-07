# Website Servitrad

Site institucional de uma página para a **Servitrad, Lda**: tradução, interpretação, aluguer de equipamento áudio, videoconferência e transmissão ao vivo.

A sequência e o movimento seguem o vídeo de referência (Ronas IT): hero com título que surge letra a letra e ilustração dentro de um círculo rodeada de elementos flutuantes, cartões de serviços em grelha assimétrica (o contorno desenha-se e o cartão de destaque enche de azul profundo), uma faixa horizontal, a FAQ em acordeão que chega da direita, artigos e o rodapé. A identidade é toda da Servitrad (azul royal, azul profundo, ciano). Do template não se reutilizou texto, cor, ilustração nem testemunho.

## Como abrir

É HTML, CSS e JavaScript simples, sem build. Pode abrir o `index.html` directamente no browser ou servir a pasta:

```bash
python3 -m http.server 8080   # depois abra http://localhost:8080
```

Para publicar, envie a pasta toda para qualquer alojamento estático (Netlify, Vercel, GitHub Pages, cPanel…).

## Estrutura

```
index.html            página principal
privacidade.html      privacidade e termos (rascunho a validar)
css/styles.css        estilos, animações e responsivo
js/content.js         ← CONTEÚDO EDITÁVEL (serviços, equipamento, etapas, FAQ, artigos, contactos, formulário)
js/icons.js           ícones dos serviços (inline, copiados de assets/icones)
js/main.js            renderização, animações e formulário
assets/               logótipo (referência), ilustração 3D, ícones, favicon
docs/referencia/      brief, auditoria, análise do vídeo e paleta recebidos
```

## Editar conteúdo

Edite apenas `js/content.js`:

- **Serviços**: título, resumo, detalhe e pontos. Com `destaque: true`, o cartão fica alto e escuro.
- **Equipamento**: todos os itens actuais são **de exemplo** (`exemplo: true`) e aparecem com essa etiqueta e um aviso. Quando houver inventário real, retire `exemplo` e acrescente `imagem: "assets/equipamento/nome.webp"`. Se a lista ficar vazia, a secção desaparece.
- **Como funciona**: as quatro etapas da faixa horizontal.
- **FAQ**: com `publicado: false`, a pergunta fica escondida. As respostas têm de ser validadas pela empresa.
- **Artigos**: a lista começa vazia, por isso a secção **está oculta**. Para ver o layout sem publicar nada, abra `index.html?preview=artigos`.

## Substituir o logótipo

O símbolo em `assets/logotipo/` e o que está inline no `index.html` (cabeçalho e rodapé) são uma **reconstrução aproximada**. Quando chegar o ficheiro oficial:

1. Coloque-o em `assets/logotipo/`.
2. No `index.html` e no `privacidade.html`, troque cada bloco `<svg class="brand__mark">…</svg>` + `.brand__text` por `<img src="assets/logotipo/oficial.svg" alt="Servitrad" height="40">`.
3. Substitua também `assets/favicon.svg`.

## Contactos

Os contactos vêm das publicações oficiais da Servitrad e estão em `contactos` (`js/content.js`): WhatsApp +258 84 687 2030, telefone +258 82 386 7105, email servitrad83@gmail.com e a morada na Av. Ahmed Sekou Touré. Com `confirmados: false`, o rodapé volta a mostrar a nota "Contactos a confirmar". O `privacidade.html` e o `<noscript>` do `index.html` também repetem estes contactos.

## Fotografias do equipamento

As imagens em `assets/equipamento/` foram recortadas de capturas de ecrã das publicações da Servitrad no Facebook, por isso têm resolução limitada. Para melhorar a qualidade, substitua cada ficheiro pela fotografia original, com o mesmo nome (formato `.webp` ou `.jpg`, cerca de 900px de largura).

## Formulário de agendamento

O formulário tem cinco etapas (serviço → data e local → detalhes → contacto → revisão), com validação em cada uma, armadilha anti-spam (campo escondido e tempo mínimo) e os estados do pedido: *Pedido enviado → Em análise → Proposta enviada → Confirmado → Concluído*. Em nenhum momento diz que a data ficou reservada.

- **Sem `formulario.endpoint`** (situação actual): **modo de demonstração**. Aparece um aviso e **nada é guardado**. No fim, o visitante pode enviar o resumo por email ou por WhatsApp.
- **Com endpoint**: o pedido é enviado por `POST` em JSON para esse URL (Formspree, Netlify Function, backend próprio…). O serviço que recebe deve:
  - enviar ao cliente o email de confirmação de recepção;
  - guardar o pedido com o estado `Pedido enviado`;
  - aplicar uma protecção anti-spam do lado do servidor (por exemplo, reCAPTCHA/Turnstile ou rate limit).

O formulário não aceita anexos. Os documentos confidenciais devem seguir por um canal definido pela empresa.

## Acessibilidade e movimento

- Respeita `prefers-reduced-motion`: sem animações, todo o conteúdo fica visível.
- O acordeão usa botões verdadeiros com `aria-expanded` e funciona com Tab, Enter/Espaço e as setas ↑/↓.
- A faixa horizontal funciona com toque, arrasto do rato, botões e as teclas ←/→/Home/End.
- Sem scroll-jacking, sem carrossel automático e sem animações em loop.

## Validar com a empresa antes de publicar

Nome legal, logótipo original, contactos, horário, idiomas, inventário e fotografias (com autorização de uso), preços, processo de reserva e cancelamento, domínio e textos legais (`privacidade.html`).
