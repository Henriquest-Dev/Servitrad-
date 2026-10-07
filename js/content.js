/* ==========================================================================
   SERVITRAD — CONTEÚDO EDITÁVEL ("CMS" simples)
   --------------------------------------------------------------------------
   Todo o texto dinâmico do site vive neste ficheiro. Edite os valores entre
   aspas e grave; não é preciso tocar no HTML nem no JavaScript principal.

   Regras de publicação (ver README.md):
   • Itens com `publicado: false` não aparecem no site.
   • Itens com `exemplo: true` aparecem com a etiqueta "Exemplo".
   • Nada aqui deve afirmar idiomas, certificações, marcas, tarifas ou prazos
     que a Servitrad não tenha confirmado por escrito.
   ========================================================================== */

window.SERVITRAD = {
  empresa: {
    nome: "Servitrad, Lda",           // VALIDAR nome legal
    assinatura: "Serviços & Traduções",
    ano: new Date().getFullYear(),
  },

  /* Contactos vistos na página pública. VALIDAR com a empresa antes de publicar.
     Enquanto `confirmados` for false, o rodapé mostra a nota "a confirmar". */
  contactos: {
    confirmados: false,
    telefone: "+258 84 687 2030",
    telefoneLink: "+258846872030",
    whatsapp: "258846872030",          // só dígitos, com indicativo
    email: "servitrad@hotmail.com",
    localizacao: "Mateque, Maning, Marracuene — Moçambique",
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

  servicos: [
    {
      id: "traducao",
      icone: "traducao",
      titulo: "Tradução de documentos",
      resumo: "Textos traduzidos com cuidado para comunicar sem ambiguidades.",
      detalhe:
        "Tradução de documentos para empresas, instituições e particulares. Envie-nos o tipo de documento e a finalidade e preparamos uma proposta.",
      pontos: [
        "Pedido de orçamento sem compromisso",
        "Análise do tipo de documento e da finalidade",
        "Idiomas, prazos e certificações: indicados na proposta",
      ],
    },
    {
      id: "interpretacao",
      icone: "interpretacao",
      destaque: true,
      titulo: "Interpretação de conferências",
      resumo: "Interpretação simultânea para que cada participante acompanhe o evento.",
      detalhe:
        "Interpretação para conferências, reuniões e eventos. Avaliamos o formato, o número de participantes e o equipamento necessário para a sala.",
      pontos: [
        "Análise do programa e do formato do evento",
        "Coordenação com o equipamento de interpretação",
        "Idiomas disponíveis confirmados caso a caso",
      ],
    },
    {
      id: "equipamento",
      icone: "conferencia",
      titulo: "Aluguer de equipamento áudio",
      resumo: "Microfones, sistemas de interpretação e som para conferências e eventos.",
      detalhe:
        "Aluguer de equipamento áudio para conferências e de som para eventos. A disponibilidade e a configuração são confirmadas após análise do pedido.",
      pontos: [
        "Equipamento para conferências e eventos",
        "Montagem e apoio técnico a combinar",
        "Disponibilidade sujeita a confirmação",
      ],
    },
    {
      id: "videoconferencia",
      icone: "videoconferencia",
      titulo: "Videoconferência",
      resumo: "Ligue participantes remotos à sala com som e imagem claros.",
      detalhe:
        "Soluções de videoconferência para reuniões e eventos híbridos, integradas com o áudio da sala quando necessário.",
      pontos: [
        "Reuniões presenciais, remotas ou híbridas",
        "Integração com o som da sala",
        "Requisitos técnicos avaliados no pedido",
      ],
    },
    {
      id: "transmissao",
      icone: "som",
      titulo: "Transmissão ao vivo",
      resumo: "Leve o seu evento a quem não pode estar presente.",
      detalhe:
        "Transmissões ao vivo de conferências e eventos. Definimos consigo a plataforma, o local e as necessidades técnicas.",
      pontos: [
        "Planeamento conforme o local e a plataforma",
        "Captação de som para transmissão",
        "Proposta adaptada ao evento",
      ],
    },
  ],

  /* Catálogo de equipamento. Até a Servitrad fornecer o inventário real,
     todos os itens são DEMONSTRATIVOS (exemplo: true). Para cada item real:
     remova `exemplo`, ajuste o texto e acrescente `imagem: "assets/equipamento/ficheiro.webp"`. */
  equipamento: [
    { categoria: "Interpretação", icone: "interpretacao", nome: "Sistema de interpretação simultânea", texto: "Cabina, consolas e receptores para os participantes.", exemplo: true },
    { categoria: "Interpretação", icone: "interpretacao", nome: "Receptores com auscultadores", texto: "Para os participantes acompanharem a interpretação.", exemplo: true },
    { categoria: "Conferências", icone: "conferencia", nome: "Sistema de microfones de conferência", texto: "Microfones de mesa para oradores e delegados.", exemplo: true },
    { categoria: "Conferências", icone: "conferencia", nome: "Microfones sem fios", texto: "De mão ou de lapela, para palco e perguntas do público.", exemplo: true },
    { categoria: "Som", icone: "som", nome: "Sistema de som para eventos", texto: "Colunas e mesa de mistura dimensionadas para o espaço.", exemplo: true },
    { categoria: "Vídeo", icone: "videoconferencia", nome: "Kit de videoconferência", texto: "Câmara, áudio e ligação para participantes remotos.", exemplo: true },
  ],

  /* Faixa "Como funciona". */
  etapas: [
    { titulo: "Pedido", quem: "Cliente", texto: "Envie o formulário com o serviço, a data, o local e o que precisa — leva poucos minutos." },
    { titulo: "Análise de requisitos", quem: "Equipa Servitrad", texto: "A equipa analisa o pedido e contacta-o se faltar alguma informação sobre o evento ou o documento." },
    { titulo: "Proposta", quem: "Servitrad e cliente", texto: "Enviamos uma proposta com o serviço, o equipamento e as condições para a sua aprovação." },
    { titulo: "Confirmação", quem: "Servitrad", texto: "A data só fica reservada depois da confirmação da Servitrad. Até lá, o pedido é uma solicitação." },
  ],

  /* FAQ — respostas a VALIDAR com a empresa. Coloque `publicado: false` para esconder. */
  faq: [
    {
      pergunta: "Como peço um orçamento?",
      resposta: "Preencha o formulário “Agendar serviço” nesta página ou contacte-nos por telefone, WhatsApp ou email. Indique o serviço, a data e o local para prepararmos a proposta.",
      publicado: true,
    },
    {
      pergunta: "A data fica reservada quando envio o pedido?",
      resposta: "Ainda não. O envio do formulário é uma solicitação. A data só fica reservada depois de a Servitrad confirmar a disponibilidade e de aceitar a proposta.",
      publicado: true,
    },
    {
      pergunta: "Que equipamento posso alugar?",
      resposta: "Trabalhamos com equipamento áudio para conferências, som para eventos, videoconferência e transmissão ao vivo. A configuração exacta depende do espaço e do número de participantes e é indicada na proposta.",
      publicado: true,
    },
    {
      pergunta: "A interpretação pode ser combinada com o aluguer de equipamento?",
      resposta: "Sim. Pode pedir interpretação e equipamento no mesmo pedido; analisamos tudo em conjunto para a sala e o formato do evento.",
      publicado: true,
    },
    {
      pergunta: "Com quanta antecedência devo fazer o pedido?",
      resposta: "Quanto mais cedo, melhor: assim é mais fácil garantir equipa e equipamento. O prazo para cada serviço é indicado na proposta.",
      publicado: true,
    },
  ],

  /* Guias e novidades. Lista vazia → a secção fica oculta.
     Formato: { titulo, resumo, etiqueta, url, imagem (opcional), data: "2026-01-31" } */
  artigos: [],
};
