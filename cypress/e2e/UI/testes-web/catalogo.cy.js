describe('Catálogo de produtos', () => {
  beforeEach(() => {
    cy.visit('http://localhost/produtos/');
  });

  it('Visualizar produtos na loja (feliz)', () => {
    // Verifica se pelo menos um produto está visível na tela
    cy.get('.products .product').should('have.length.greaterThan', 0);
  });

  it('Ordenar produtos por preço: do menor para o maior (alternativo)', () => {
    // Seleciona ordenação por preço: menor para maior
    cy.get('select.orderby').select('price');

    // Espera a ordenação acontecer
    cy.wait(1000);

    // Verifica se a lista de produtos mudou comparando os dois primeiros
    cy.get('.products .product').eq(0).invoke('text').then((firstProduct) => {
      cy.get('.products .product').eq(1).invoke('text').then((secondProduct) => {
        expect(firstProduct).not.to.eq(secondProduct);
      });
    });
  });
});