export const footerData = {
  supportTexts: ['Quer apoiar o Cantinho?', 'Siga nossas redes sociais:', 'contato@cantinhodasqas.com.br'],
  commonTexts: ['Siga nossas redes sociais:', 'contato@cantinhodasqas.com.br'],
  commonVisibleLinks: ['Acesse nosso mídia-kit', 'Download Mídia-Kit'],
  visibleLinks: [
    'Clique e apoie !',
    'Acesse nosso mídia-kit',
    'Download Mídia-Kit',
    'LinkedIn',
    'Instagram',
    'YouTube',
    'Email',
  ],
  links: [
    { name: 'Acesse nosso mídia-kit', href: /midia-kit-cantinhodasqas/ },
    { name: 'Download Mídia-Kit', href: /drive\.google\.com\/uc\?export=download/ },
    { name: 'LinkedIn', href: /linkedin\.com/ },
    { name: 'Instagram', href: /instagram\.com/ },
    { name: 'YouTube', href: /youtube\.com\/@CantinhodasQAs/ },
    { name: 'Email', href: 'mailto:contato@cantinhodasqas.com.br' },
  ],
};

export const searchData = {
  query: 'CTFL',
  resultsUrl: /\/_\/search\?query=CTFL/,
  results: [
    { name: 'CTFL', href: /\/ctfl$/ },
    { name: 'CTFL - AT', href: /\/ctfl-at$/ },
    { name: 'Quem Somos', href: /\/quem-somos$/ },
  ],
};

export const navigationData = {
  links: [
    { name: 'Quem Somos', href: /\/quem-somos$/, expectedText: 'MISSÃO' },
    { name: 'Trilha de Estudos', href: /\/trilha-de-estudos$/, expectedText: 'Trilha Quality Assurance' },
    { name: 'Parcerias', href: /\/parcerias$/, expectedText: 'Plataforma - Qualitersclub - Priscila Caimi' },
    { name: 'Sites para Praticar', href: /\/sites-para-praticar$/, expectedText: 'Testes Manuais' },
    { name: 'CTFL', href: /\/ctfl$/, expectedText: 'Simulado CTFL 4.0' },
    { name: 'CTFL - AT', href: /\/ctfl-at$/, expectedText: 'CTFL-AT' },
  ],
  moreMenuLinks: [
    { name: '3º Aniversário do Cantinho das QAs', href: /aniversariocantinho/ },
    { name: 'Eventos', href: /\/eventos$/ },
    { name: 'Nosso Canal', href: /\/nosso-canal$/ },
  ],
};
