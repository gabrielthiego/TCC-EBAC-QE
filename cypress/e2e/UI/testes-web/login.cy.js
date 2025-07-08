describe('[US-0002] Login na plataforma', () => {
  beforeEach(() => {
    cy.visit('/minha-conta');
  });

  it('Login com credenciais válidas (feliz)', () => {
    cy.get('#username').type('usuario@teste.com');
    cy.get('#password').type('senha123');
    cy.get('[name="login"]').click();
    cy.contains('Olá,').should('be.visible');
  });

  it('Login com e-mail inválido (alternativo)', () => {
    cy.get('#username').type('email-invalido@teste.com');
    cy.get('#password').type('qualquercoisa123');
    cy.get('[name="login"]').click();

    cy.get('.woocommerce-error')
      .should('contain', 'Endereço de e-mail desconhecido');
  });
});