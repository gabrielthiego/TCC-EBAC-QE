describe('[US-0004] Catálogo de produtos', () => {

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br');
  });

  it('Cenário 1: Listar produtos no catálogo (caminho feliz)', () => {
    cy.get('.product-block').should('have.length.at.least', 1);
  });

  it('Cenário 2: Filtrar produtos por categoria (fluxo alternativo)', () => {
    cy.get('.cat-item a').contains('Feminino').click(); // exemplo de categoria
    cy.url().should('include', 'product-category/feminino');
    cy.get('.product-block').should('have.length.at.least', 1);
  });

  it('Cenário 3: Filtrar por termo inexistente (fluxo negativo)', () => {
    cy.get('#woocommerce-product-search-field-0').type('inexistente{enter}');
    cy.get('.woocommerce-info').should('contain', 'Nenhum produto foi encontrado');
  });

});
