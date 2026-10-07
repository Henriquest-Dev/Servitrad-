# Prompt de implementação — website dinâmico Servitrad

Cria um website institucional premium, responsivo e dinâmico para **Servitrad, Lda**, empresa moçambicana cuja página pública apresenta tradução, interpretação, aluguer de equipamento áudio para conferências e eventos, videoconferência e transmissões ao vivo.

## Referência de composição e scroll

Usa `template-scroll/analise-do-template.md` e as capturas em `template-scroll/` para compreender a sequência visual. Replica o ritmo de exploração: hero ilustrado → cartões de serviços → faixa horizontal de conteúdo → FAQ em acordeão → artigos → rodapé. Mantém a composição clara, o espaço branco, os cartões com cantos arredondados e as microinteracções. **Não copies** os textos, marca, cor rosa/coral, ilustrações, depoimentos ou logótipos do template. A faixa de testemunhos do modelo deve ser substituída por etapas de trabalho, a menos que a Servitrad forneça depoimentos reais e autorização para os publicar.

## Marca e ficheiros

- Usa azul royal, azul profundo e ciano conforme `auditoria-identidade-e-conteudo.md` e `design/paleta-e-direcao-visual.svg`.
- `assets/logotipo/servitrad-logo-referencia.svg` e `.png` são uma **reconstrução vectorial aproximada** baseada na imagem pública; usar só como placeholder e substituir pelo logótipo oficial fornecido pela empresa antes de publicar.
- `assets/3d/hero-interpretacao-traducao-3d.png` é a ilustração original para o hero, com transparência. Pode receber parallax suave, rotação mínima e entrada por opacidade; não distorcer nem esconder conteúdo importante.
- `assets/icones/*.svg` contém ícones originais para os serviços. Usar consistentes em tamanho e traço.
- Não extrair nem reutilizar os elementos visuais do template além das capturas de referência. Não usar imagem de banco sem licença validada.

## Conteúdo e estrutura

1. **Cabeçalho:** logótipo, links Início, Serviços, Equipamento, Como funciona, FAQ, Contactos; botão “Agendar serviço”. Em mobile, menu compacto acessível.
2. **Hero:** título sugerido “Comunicação clara. Eventos bem preparados.”; texto breve que ligue tradução e soluções técnicas para eventos. CTAs “Pedir orçamento” e “Agendar serviço”. Ilustração 3D à direita ou ao centro, com elementos decorativos em ciano.
3. **Serviços:** cinco cartões — Tradução de documentos; Interpretação de conferências; Aluguer de equipamento áudio; Videoconferência; Transmissão ao vivo. Cada cartão abre detalhe e leva a pedido de orçamento. Não inventar idiomas, certificações, marcas de equipamentos, tarifas ou prazos.
4. **Equipamento e eventos:** galeria/catálogo administrável para equipamento real. Até o inventário ser fornecido, manter componentes e dados demonstrativos claramente marcados como conteúdo de exemplo; não fingir disponibilidade nem mostrar modelos específicos como se fossem propriedade da empresa.
5. **Faixa de scroll “Como funciona”:** pedido → análise de requisitos → proposta → confirmação. Mostrar que a reserva só é final após confirmação da Servitrad, salvo futura integração de disponibilidade validada.
6. **Agendamento:** formulário em etapas com serviço, data, hora, local/modalidade, dimensão aproximada, requisitos técnicos, contacto e observações. Estados: pedido enviado, em análise, proposta enviada, confirmado, concluído. Não declarar uma data reservada automaticamente sem calendário operacional. Enviar confirmação de recepção; proteger contra spam e guardar apenas dados necessários.
7. **FAQ:** acordeão por teclado e toque. Perguntas sobre como pedir orçamento, disponibilidade, equipamento, interpretação e prazos; respostas editáveis e só publicadas após confirmação pela empresa.
8. **Guias e novidades:** cartões de artigos publicados via CMS; se não houver conteúdo, ocultar a secção até existirem artigos reais. Não inventar artigos ou resultados.
9. **Rodapé:** resumo de serviços, contactos oficialmente confirmados, links sociais oficiais, localização e políticas. Reutilizar os contactos vistos na página apenas depois de confirmação final.

## Animação e acessibilidade

- Scroll reveal com opacidade e deslocamento curto; iniciar apenas quando a secção entra no viewport.
- Parallax subtil no hero e nos círculos decorativos; manter performance em telemóveis.
- Cartões: elevação e mudança de cor pequenas ao passar o cursor; evitar saltos de layout.
- Faixa horizontal navegável com touch, setas e teclado; não deixar conteúdo fora de alcance.
- Respeitar `prefers-reduced-motion`; manter todos os conteúdos legíveis sem animação.
- Acordeões com semântica, foco visível, contraste AA, texto alternativo e botões verdadeiros.
- Não usar scroll-jacking, carrossel automático agressivo, animação infinita, pop-ups intrusivos ou fontes pequenas.

## Entrega técnica

Produz o website com componentes reutilizáveis e CMS/configuração simples para editar serviços, imagens, perguntas frequentes, artigos e pedidos. Se não existir backend disponível, criar o fluxo visual completo com envio seguro claramente configurável, sem fingir que pedidos estão a ser guardados. Usar dados demonstrativos identificados. Entregar páginas responsivas, estados de formulário, validações e instruções curtas de substituição do logótipo e contactos.

Antes de considerar pronto, validar nome oficial, logótipo original, contactos, idiomas, inventário, preços, disponibilidade, política de cancelamento, domínio e textos legais com a empresa.
