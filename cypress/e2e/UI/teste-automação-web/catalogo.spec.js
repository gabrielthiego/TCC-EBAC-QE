describe('Catálogo de Produtos EBAC Shop', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve exibir a lista de produtos corretamente', () => {
    cy.get('.product-item').should('have.length.greaterThan', 0)
  })

  it('Deve permitir filtrar produtos por categoria', () => {
    cy.get('.filter-category').click()
    cy.get('.filter-option').contains('Eletrônicos').click()
    cy.get('.product-item').each(($el) => {
      cy.wrap($el).find('.category-label').should('contain.text', 'Eletrônicos')
    })
  })

  it('Deve abrir a página de detalhes ao clicar no produto', () => {
    cy.get('.product-item').first().click()
    cy.url().should('include', '/produto/')
    cy.get('.product-title').should('be.visible')
  })

  it('Deve adicionar um produto ao carrinho a partir do catálogo', () => {
    cy.get('.product-item').first().within(() => {
      cy.get('.add-to-cart-btn').click()
    })
    cy.get('.cart-count').should('contain.text', '1')
  })
})
