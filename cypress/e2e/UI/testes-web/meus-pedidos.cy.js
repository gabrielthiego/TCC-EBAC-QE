describe('Meus pedidos', () => {
  beforeEach(() => {
    cy.visit('/minha-conta/');
    cy.get('#username').type('seu-usuario@teste.com');
    cy.get('#password').type('senha@123', { log: false });
    cy.get('button[name="login"]').click();
    cy.contains('Olá,', { timeout: 10000 }).should('be.visible');
  });

  it('Listar pedidos após login (feliz)', () => {
    cy.get('.woocommerce-MyAccount-navigation-link--orders').click();
    cy.get('table.my_account_orders', { timeout: 10000 }).should('be.visible');
  });

  it('Nenhum pedido realizado (alternativo)', () => {
    cy.get('.woocommerce-MyAccount-navigation-link--orders').click();
    cy.contains('Nenhum pedido foi feito ainda.', { timeout: 10000 }).should('be.visible');
  });
});