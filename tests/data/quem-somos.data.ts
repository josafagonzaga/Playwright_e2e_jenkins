export const quemSomosData = {
  url: 'https://www.cantinhodasqas.com.br/quem-somos',
  headerLinks: [
    /Cantinho das QAs/,
    'Quem Somos',
    'Trilha de Estudos',
    'Parcerias',
    'Sites para Praticar',
    'CTFL',
    'CTFL - AT',
    'More',
  ],
  mainHeadings: ['MISSÃO', 'VISÃO', 'VALORES'],
  internalLinks: [
    { name: 'Quem Somos', path: /\/quem-somos$/, expectedText: 'MISSÃO' },
    { name: 'Trilha de Estudos', path: /\/trilha-de-estudos$/, expectedText: 'Trilha Quality Assurance' },
    { name: 'Parcerias', path: /\/parcerias$/, expectedText: 'Plataforma - Qualitersclub - Priscila Caimi' },
    { name: 'Sites para Praticar', path: /\/sites-para-praticar$/, expectedText: 'Testes Manuais' },
    { name: 'CTFL', path: /\/ctfl$/, expectedText: 'Simulado CTFL 4.0' },
    { name: 'CTFL - AT', path: /\/ctfl-at$/, expectedText: 'CTFL-AT' },
  ],
  moreMenuLinks: ['3º Aniversário do Cantinho das QAs', 'Eventos', 'Nosso Canal'],
  administratorProfileHrefs: [
    'linkedin.com%2Fin%2Fsara-r-s-vieira',
    'linkedin.com%2Fin%2Freginaazzi',
    'linkedin.com%2Fin%2Fvivianflima',
  ],
  footerLinks: [{ name: 'Clique e apoie !', href: /apoia\.se/ }],
};
