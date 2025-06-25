describe('Adicionar item ao carrinho - EBAC Shop', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve adicionar até 10 unidades de um produto ao carrinho', () => {
    cy.get('.product-item').first().click()
    cy.get('input.quantity').clear().type('10')
    cy.get('button.add-to-cart').click()
    cy.get('.cart-items-count').should('contain.text', '10')
  })

  it('Não deve permitir adicionar mais de 10 unidades', () => {
    cy.get('.product-item').first().click()
    cy.get('input.quantity').clear().type('11')
    cy.get('button.add-to-cart').click()
    cy.get('.error-message').should('contain.text', 'Limite máximo de 10 unidades')
  })

  it('Deve bloquear adição quando o valor do carrinho ultrapassar R$ 990', () => {
    // Simular adiç
