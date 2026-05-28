const homeHref = /^(\/|https:\/\/complysolutions\.com\.br\/?)$/;

export type HeaderLinkExpectation = {
  name: string | RegExp;
  href: string | RegExp;
  exact?: boolean;
  anchorId?: string;
};

export type HeaderIconLinkExpectation = {
  href: string | RegExp;
  hrefPart: string;
};

export const headerData = {
  logo: {
    imageFile: 'Group-771.png',
    href: /\/$/,
  },
  desktopNavigationLinks: [
    {
      name: 'HOME',
      href: homeHref,
      exact: true,
    },
    {
      name: 'COMPLYSOFT',
      href: /#solucoes-complysolutions$/,
      exact: true,
      anchorId: 'solucoes-complysolutions',
    },
    {
      name: 'SOLUÇÕES',
      href: /#solucoes-complysolutions$/,
      exact: true,
      anchorId: 'solucoes-complysolutions',
    },
    {
      name: 'CASES',
      href: /\/case-studies\/$/,
      exact: true,
    },
    {
      name: 'INTEGRAÇÕES',
      href: /#integracoes$/,
      exact: true,
      anchorId: 'integracoes',
    },
    {
      name: 'CONTATOS',
      href: /\/contato\/$/,
      exact: true,
    },
  ],
  desktopSupportLinks: [
    {
      name: 'Suporte Comply',
      href: /\/contato\/$/,
      exact: true,
    },
    {
      name: '(83) 9415-2692',
      href: /^$/,
      exact: true,
    },
    {
      name: 'FALE CONOSCO',
      href: /\/contato\/$/,
      exact: true,
    },
  ],
  mobileTopLinks: [
    {
      name: 'Fale Conosco',
      href: /\/contato\/$/,
      exact: true,
    },
  ],
  mobileMenuLinks: [
    {
      name: 'HOME',
      href: homeHref,
      exact: true,
    },
    {
      name: 'COMPLYSOFT',
      href: /#solucoes-complysolutions$/,
      exact: true,
      anchorId: 'solucoes-complysolutions',
    },
    {
      name: 'SOLUÇÕES',
      href: /#solucoes-complysolutions$/,
      exact: true,
      anchorId: 'solucoes-complysolutions',
    },
    {
      name: 'CASES',
      href: /#cases$/,
      exact: true,
      anchorId: 'cases',
    },
    {
      name: 'INTEGRAÇÕES',
      href: /#integracoes$/,
      exact: true,
      anchorId: 'integracoes',
    },
    {
      name: 'CONTATOS',
      href: /#contato$/,
      exact: true,
      anchorId: 'contato',
    },
  ],
  mobileContactLinks: [
    {
      name: '83 9415-2692',
      href: /wa\.me\/558394152692/,
      exact: true,
    },
    {
      name: 'contato@complysolutions.com.br',
      href: /^mailto:contato@complysolutions\.com\.br$/,
      exact: true,
    },
  ],
  mobileSocialLinks: [
    {
      href: /facebook\.com\/cplysolutions/,
      hrefPart: 'facebook.com/cplysolutions',
    },
    {
      href: /instagram\.com\/cplysolutions/,
      hrefPart: 'instagram.com/cplysolutions',
    },
    {
      href: /youtube\.com\/@CplySolutions/,
      hrefPart: 'youtube.com/@CplySolutions',
    },
    {
      href: /linkedin\.com\/company\/cplysolutions/,
      hrefPart: 'linkedin.com/company/cplysolutions',
    },
    {
      href: /github\.com\/Complysoft/,
      hrefPart: 'github.com/Complysoft',
    },
  ],
  internalHttpTargets: ['/', '/case-studies/', '/contato/'],
};
