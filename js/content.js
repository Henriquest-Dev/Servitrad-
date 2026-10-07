/* ==========================================================================
   SERVITRAD — CONTEÚDO EDITÁVEL ("CMS" simples)
   --------------------------------------------------------------------------
   Todo o texto dinâmico do site vive neste ficheiro. Edite os valores entre
   aspas e grave; não é preciso tocar no HTML nem no JavaScript principal.

   Regras de publicação (ver README.md):
   • Itens com `publicado: false` não aparecem no site.
   • Itens com `exemplo: true` aparecem com a etiqueta "Exemplo".
   • Fonte dos dados: publicações oficiais da Servitrad (Facebook, 2024–2025).
   ========================================================================== */

window.SERVITRAD = {
  empresa: {
    nome: "Servitrad, Lda",
    assinatura: "Serviços & Traduções",
    slogan: "Mais que palavras, ligamos pessoas e negócios.",
    ano: new Date().getFullYear(),
  },

  /* Contactos das publicações oficiais da Servitrad.
     Com `confirmados: false`, o rodapé mostra a nota "a confirmar". */
  contactos: {
    confirmados: true,
    telefones: [
      { rotulo: "WhatsApp", numero: "+258 84 687 2030", link: "+258846872030" },
      { rotulo: "Telefone", numero: "+258 82 386 7105", link: "+258823867105" },
    ],
    whatsapp: "258846872030",          // só dígitos, com indicativo
    email: "servitrad83@gmail.com",
    localizacao: "Av. Ahmed Sekou Touré — Moçambique",
    horario: "",                       // ex.: "Seg–Sex, 08:00–17:00" (a fornecer)
    redes: [
      { nome: "Facebook", url: "https://www.facebook.com/servitradlda/" },
      { nome: "Instagram", url: "https://www.instagram.com/servitradlda/" },
    ],
  },

  /* Envio do formulário de pedidos.
     • endpoint vazio  → modo demonstração: NADA é guardado; o visitante pode
       enviar o resumo por email ou WhatsApp.
     • endpoint definido → POST JSON para esse URL (Formspree, Netlify Forms,
       função serverless, backend próprio…). A confirmação de recepção por
       email deve ser enviada por esse serviço. */
  formulario: {
    endpoint: "",
    tempoMinimoSegundos: 4,            // anti-spam: envios mais rápidos são rejeitados
  },

  /* Ordem = ordem no site. `destaque: true` → cartão alto e escuro. */
  servicos: [
    {
      id: "traducao",
      icone: "traducao",
      titulo: "Tradução de documentos",
      resumo: "Tradução juramentada por tradutores ajuramentados, em diversos idiomas.",
      detalhe:
        "Traduzimos os seus documentos com confiança e sem perder nenhum detalhe. A nossa equipa de tradutores certificados e ajuramentados trata documentos pessoais, académicos, jurídicos, comerciais e técnicos.",
      pontos: [
        "Documentos pessoais: passaporte, BI, certidão de casamento, assento de nascimento, registo criminal, permissão de viagem",
        "Certificados e diplomas (tradução juramentada)",
        "Tradução empresarial: propostas, contratos, relatórios e manuais",
        "Documentos jurídicos, académicos, comerciais e técnicos",
      ],
    },
    {
      id: "interpretacao",
      icone: "falar",
      destaque: true,
      titulo: "Interpretação simultânea e consecutiva",
      resumo: "Intérpretes profissionais e qualificados para reuniões, conferências e eventos.",
      detalhe:
        "Interpretação simultânea e consecutiva para reuniões, conferências e eventos, com intérpretes profissionais e qualificados. Podemos fornecer também todo o equipamento de interpretação.",
      pontos: [
        "Interpretação simultânea e consecutiva",
        "Reuniões, conferências, seminários e eventos",
        "Diversos idiomas e áreas de actuação",
        "Equipamento de interpretação incluído quando necessário",
      ],
    },
    {
      id: "equipamento",
      icone: "interpretacao",
      titulo: "Aluguer de equipamento de interpretação",
      resumo: "Cabines, headsets, receptores e microfones de conferência.",
      detalhe:
        "Alugamos o equipamento para interpretação simultânea e conferências, com montagem na sala.",
      pontos: [
        "Cabines de interpretação",
        "Headsets e receptores para os participantes",
        "Microfones de conferência para oradores e delegados",
        "Montagem e apoio técnico no evento",
      ],
    },
    {
      id: "som",
      icone: "som",
      titulo: "Som, palco e iluminação para eventos",
      resumo: "Tudo para conferências, casamentos e eventos — num só lugar.",
      detalhe:
        "Venha alugar tudo aqui: faça do seu evento, casamento ou conferência um momento memorável, com equipamento de alta qualidade.",
      pontos: [
        "Line arrays (“linners”) e subwoofers",
        "Microfones sem fio e mesas de mistura",
        "Palco modular e estruturas",
        "Iluminação LED e gerador de energia",
      ],
    },
    {
      id: "videoconferencia",
      icone: "videoconferencia",
      titulo: "Videoconferência",
      resumo: "Ligue participantes remotos à sala com som e imagem claros.",
      detalhe:
        "Soluções de videoconferência para reuniões e eventos híbridos, com ecrãs e integração com o som da sala.",
      pontos: [
        "Reuniões presenciais, remotas ou híbridas",
        "Ecrãs e integração com o som da sala",
        "Pode ser combinada com interpretação",
      ],
    },
    {
      id: "transmissao",
      icone: "transmissao",
      titulo: "Transmissão ao vivo",
      resumo: "Som e imagem para levar o seu evento a quem não pode estar presente.",
      detalhe:
        "Transmissões ao vivo de conferências e eventos. Definimos consigo a plataforma, o local e as necessidades de som e imagem.",
      pontos: [
        "Captação de som e imagem",
        "Planeamento conforme o local e a plataforma",
        "Proposta adaptada ao evento",
      ],
    },
    {
      id: "eventos",
      icone: "calendario",
      titulo: "Organização e gestão de eventos",
      resumo: "Coordenamos a parte técnica e linguística do seu evento.",
      detalhe:
        "Organizamos e gerimos eventos: do equipamento de som e imagem à interpretação, tratamos de tudo para que o evento corra bem.",
      pontos: [
        "Planeamento técnico do evento",
        "Som, imagem, palco e energia",
        "Interpretação e tradução no mesmo pedido",
      ],
    },
  ],

  /* Catálogo de equipamento com fotografias das publicações da Servitrad.
     Para substituir uma imagem, coloque o ficheiro em assets/equipamento/
     e actualize `imagem`. Use `exemplo: true` para itens demonstrativos. */
  equipamento: [
    { categoria: "Interpretação", icone: "interpretacao", imagem: "assets/equipamento/cabine-interpretacao.webp", nome: "Cabine de interpretação", texto: "Cabine para os intérpretes, montada na sala do evento." },
    { categoria: "Interpretação", icone: "interpretacao", imagem: "assets/equipamento/receptores-auscultadores.webp", nome: "Headsets e receptores", texto: "Para os participantes acompanharem a interpretação simultânea." },
    { categoria: "Interpretação", icone: "interpretacao", imagem: "assets/equipamento/montagem-interpretacao.webp", nome: "Consolas de interpretação", texto: "Consola e microfone para cada intérprete." },
    { categoria: "Conferências", icone: "conferencia", imagem: "assets/equipamento/microfones-conferencia.webp", nome: "Sistema de microfones de conferência", texto: "Microfones de mesa para oradores e delegados, com unidade central." },
    { categoria: "Conferências", icone: "conferencia", imagem: "assets/equipamento/microfone-delegado.webp", nome: "Microfone de delegado", texto: "Unidade de mesa com microfone de haste flexível." },
    { categoria: "Conferências", icone: "videoconferencia", imagem: "assets/equipamento/montagem-videoconferencia.webp", nome: "Ecrãs e videoconferência", texto: "Ecrãs em tripé e equipamento para reuniões híbridas." },
    { categoria: "Som", icone: "som", imagem: "assets/equipamento/mesa-receptores.webp", nome: "Microfones sem fio e mesa de mistura", texto: "Receptores sem fio, mesa de mistura e amplificação." },
    { categoria: "Som", icone: "som", imagem: "assets/equipamento/montagem-sala.webp", nome: "Som para salas e conferências", texto: "Colunas em tripé e montagem completa na sala." },
    { categoria: "Som", icone: "som", imagem: "assets/equipamento/palco-subwoofers.webp", nome: "Line arrays e subwoofers", texto: "Sistemas de som de grande potência para eventos ao ar livre." },
    { categoria: "Palco e iluminação", icone: "calendario", imagem: "assets/equipamento/palco-line-array.webp", nome: "Palco modular", texto: "Palco e estrutura de truss com som e luz suspensos." },
    { categoria: "Palco e iluminação", icone: "calendario", imagem: "assets/equipamento/iluminacao-led.webp", nome: "Iluminação LED", texto: "Projectores LED e moving heads para palco e festas." },
    { categoria: "Energia", icone: "calendario", imagem: "assets/equipamento/gerador-energia.webp", nome: "Gerador de energia", texto: "Gerador móvel para eventos sem rede eléctrica estável." },
  ],

  /* Faixa "Como funciona". */
  etapas: [
    { titulo: "Pedido", quem: "Cliente", texto: "Envie o formulário com o serviço, a data, o local e o que precisa — leva poucos minutos." },
    { titulo: "Análise de requisitos", quem: "Equipa Servitrad", texto: "A equipa analisa o pedido e contacta-o se faltar alguma informação sobre o evento ou o documento." },
    { titulo: "Proposta", quem: "Servitrad e cliente", texto: "Enviamos uma proposta com o serviço, o equipamento e as condições para a sua aprovação." },
    { titulo: "Confirmação", quem: "Servitrad", texto: "A data só fica reservada depois da confirmação da Servitrad. Até lá, o pedido é uma solicitação." },
  ],

  /* FAQ — coloque `publicado: false` para esconder uma pergunta. */
  faq: [
    {
      pergunta: "Como peço um orçamento?",
      resposta: "Preencha o formulário “Agendar serviço” nesta página ou contacte-nos por WhatsApp (+258 84 687 2030), telefone (+258 82 386 7105) ou email (servitrad83@gmail.com). Indique o serviço, a data e o local para prepararmos a proposta.",
      publicado: true,
    },
    {
      pergunta: "Fazem tradução juramentada?",
      resposta: "Sim. Trabalhamos com tradutores ajuramentados para certificados, diplomas, certidões e outros documentos que precisem de tradução juramentada.",
      publicado: true,
    },
    {
      pergunta: "Que idiomas traduzem?",
      resposta: "Trabalhamos com diversos idiomas e áreas de actuação. Indique no pedido de que língua e para que língua precisa e confirmamos na proposta.",
      publicado: true,
    },
    {
      pergunta: "A data fica reservada quando envio o pedido?",
      resposta: "Ainda não. O envio do formulário é uma solicitação. A data só fica reservada depois de a Servitrad confirmar a disponibilidade e de aceitar a proposta.",
      publicado: true,
    },
    {
      pergunta: "Alugam equipamento para casamentos e festas?",
      resposta: "Sim. Para além de conferências, alugamos som, palco modular, iluminação LED, microfones sem fio e gerador de energia para casamentos e outros eventos.",
      publicado: true,
    },
    {
      pergunta: "A interpretação pode ser combinada com o aluguer de equipamento?",
      resposta: "Sim. Pode pedir intérpretes, cabines, headsets e microfones no mesmo pedido; analisamos tudo em conjunto para a sala e o formato do evento.",
      publicado: true,
    },
  ],

  /* Guias e novidades. Lista vazia → a secção fica oculta.
     Formato: { titulo, resumo, etiqueta, url, imagem (opcional), data: "2026-01-31" } */
  artigos: [],
};
