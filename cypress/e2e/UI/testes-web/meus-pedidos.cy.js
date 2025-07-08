describe('Meus pedidos', () => {
  beforeEach(() => {
    cy.visit('http://localhost/minha-conta/');
  });

  it('Listar pedidos após login (feliz)', () => {
    cy.get('#username').type('usuario@teste.com');
    cy.get('#password').type('senha123');
    cy.get('[name="login"]').click();

    cy.visit('http://localhost/minha-conta/orders/');
    cy.get('table.my_account_orders').should('exist');
  });

  it('Nenhum pedido realizado (alternativo)', () => {
    cy.get('#username').type('usuario-sem-pedido@teste.com');
    cy.get('#password').type('senha123');
    cy.get('[name="login"]').click();

    cy.visit('http://localhost/minha-conta/orders/');
    cy.wait(3000);
    cy.contains('Nenhum pedido foi feito ainda.').should('exist');
  });
});