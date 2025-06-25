describe('Login na plataforma EBAC Shop', () => {
  beforeEach(() => {
    cy.visit('/') // baseUrl definido no config
  })

  it('Deve logar com usuário ativo e senha correta', () => {
    cy.get('input[name="username"]').type('usuario_valido')
    cy.get('input[name="password"]').type('senha_valida')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard') // ou página pós-login
    cy.contains('Bem-vindo').should('be.visible')
  })

  it('Não deve logar com credenciais incorretas', () => {
    cy.get('input[name="username"]').type('usuario_errado')
    cy.get('input[name="password"]').type('senha_errada')
    cy.get('button[type="submit"]').click()
    cy.contains('Credenciais inválidas').should('be.visible')
  })
})
