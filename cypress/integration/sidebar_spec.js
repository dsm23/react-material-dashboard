describe('Sidebar', function() {
  [
    {
      text: 'Users',
      url: '/users',
    },
    {
      text: 'Products',
      url: '/products',
    },
    {
      text: 'Typography',
      url: '/typography',
    },
    {
      text: 'Icons and Images',
      url: '/icons',
    },
    {
      text: 'Account',
      url: '/account',
    },
    {
      text: 'Settings',
      url: '/settings',
    },
  ].forEach(({ text, url }) => {
    it(`click: ${text}`, function() {
      cy.visit('/dashboard');

      // hamburger
      cy.get('button')
        .first()
        .click();

      cy.get('nav')
        .contains(text)
        .click();

      cy.url().should('include', url);

      // hamburger
      cy.get('button')
        .first()
        .click();

      cy.get('nav')
        .contains('Dashboard')
        .click();

      cy.url().should('include', '/dashboard');
    });
  });
});
