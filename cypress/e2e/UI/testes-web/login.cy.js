describe('[US-0002] Login na plataforma', () => {
  beforeEach(() => {
    cy.visit('/minha-conta/');
  });

  it('Login com credenciais válidas (feliz)', () => {
    cy.get('#username', { timeout: 10000 }).type('seu-usuario@teste.com');
    cy.get('#password', { timeout: 10000 }).type('senha@123', { log: false });
    cy.get('button[name="login"]', { timeout: 10000 }).click();

    cy.contains('Olá,', { timeout: 10000 }).should('be.visible');
  });

  it('Login com e-mail inválido (alternativo)', () => {
    cy.get('#username').type('invalido@teste.com');
    cy.get('#password').type('senhaerrada', { log: false });
    cy.get('button[name="login"]').click();

    cy.contains('Erro', { timeout: 10000 }).should('be.visible');
  });
});