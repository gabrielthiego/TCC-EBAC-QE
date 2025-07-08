describe('Minha conta', () => {
  it('Visualizar detalhes da conta após login (feliz)', () => {
    cy.visit('/minha-conta/');
    cy.get('#username').type('seu-usuario@teste.com');
    cy.get('#password').type('senha@123', { log: false });
    cy.get('button[name="login"]').click();

    cy.contains('Olá,', { timeout: 10000 }).should('be.visible');

    cy.get('.woocommerce-MyAccount-navigation-link--edit-account').click();
    cy.get('#account_first_name', { timeout: 10000 }).should('be.visible');
  });

  it('Acessar Minha Conta sem login (alternativo)', () => {
    cy.visit('/minha-conta/edit-account/');
    cy.get('#account_first_name', { timeout: 10000 }).should('not.exist');
  });
});