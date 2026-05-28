# Mapa do cabecalho

Atualizado em 2026-05-28, com base em inspecao Playwright em `https://complysolutions.com.br`.

## Desktop

Componentes visiveis:

- Logo Complysoft: link para `/`.
- Menu principal:
  - `HOME`: `/`.
  - `COMPLYSOFT`: `/#solucoes-complysolutions`.
  - `SOLUCOES`: `/#solucoes-complysolutions`.
  - `CASES`: `/case-studies/`.
  - `INTEGRACOES`: `/#integracoes`.
  - `CONTATOS`: `/contato/`.
- Bloco de suporte:
  - `Suporte Comply`: `/contato/`.
  - `(83) 9415-2692`: `href=""` no HTML; no navegador, isso resolve para a pagina atual.
  - `FALE CONOSCO`: `/contato/`.

## Mobile

Componentes visiveis no topo:

- Logo Complysoft: link para `/`.
- CTA `Fale Conosco`: `/contato/`.
- Icone de menu: abre um popup lateral.

Componentes visiveis no menu aberto:

- Logo Complysoft.
- Links de navegacao: `HOME`, `COMPLYSOFT`, `SOLUCOES`, `CASES`, `INTEGRACOES`, `CONTATOS`.
- CTA visual `FALE CONOSCO`.
- Bloco `CONTATOS`.
- Telefone `83 9415-2692`: `https://wa.me/558394152692`.
- E-mail `contato@complysolutions.com.br`: `mailto:contato@complysolutions.com.br`.
- Links sociais: Facebook, Instagram, YouTube, LinkedIn e GitHub.

## Resultado da validacao

- Destinos internos principais responderam com HTTP 200: `/`, `/case-studies/` e `/contato/`.
- Links externos verificados manualmente responderam com HTTP 200: WhatsApp, Facebook, Instagram, YouTube, LinkedIn e GitHub.
- Anchors existentes na home: `#solucoes-complysolutions`, `#integracoes` e `#cases`.

Pontos de atencao encontrados:

- No menu mobile, `CONTATOS` aponta para `/#contato`, mas a home nao possui elemento com `id="contato"`.
- No desktop, o telefone `(83) 9415-2692` esta com `href=""`; funcionalmente responde como pagina atual, mas nao leva para telefone, WhatsApp ou pagina de contato.
