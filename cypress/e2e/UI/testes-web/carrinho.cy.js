describe('[US-0001] Adicionar item ao carrinho', () => {

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br');
  });

  it('Cenário 1: Adicionar item ao carrinho (caminho feliz)', () => {
    cy.get('.product-block').first().click();
    cy.get('.button.alt').click(); // botão "Adicionar ao carrinho"
    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a').contains('Ver carrinho').click();
    cy.url().should('include', 'carrinho');
    cy.get('.cart_item').should('exist');
  });

  it('Cenário 2: Adicionar dois itens iguais ao carrinho (fluxo alternativo)', () => {
    cy.get('.product-block').first().click();
    cy.get('.button.alt').click();
    cy.get('.button.alt').click(); // adiciona de novo
    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a').contains('Ver carrinho').click();
    cy.get('.quantity input').should('have.value', '2');
  });

  it('Cenário 3: Adicionar e remover item do carrinho (fluxo negativo)', () => {
    cy.get('.product-block').first().click();
    cy.get('.button.alt').click();
    cy.get('.woocommerce-message a').contains('Ver carrinho').click();
    cy.get('.remove').click();
    cy.get('.cart-empty').should('contain', 'Seu carrinho está vazio');
  });

});
