describe('Minha conta', () => {
  it('Visualizar detalhes da conta após login (feliz)', () => {
    cy.login();
    cy.visit('/minha-conta/edit-account');
    cy.get('#account_first_name').should('exist');
    cy.get('#account_last_name').should('exist');
  });

  it('Acessar Minha Conta sem login (alternativo)', () => {
    cy.visit('/minha-conta/edit-account')
    cy.wait(3000);
    cy.get('form.login').should('exist');
  });
});