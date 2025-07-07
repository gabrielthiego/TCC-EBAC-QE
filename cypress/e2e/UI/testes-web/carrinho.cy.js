function selecionarVariacoes() {
  cy.get('.button-variable-item-XL').then(($el) => {
    if ($el.length && !$el.hasClass('disabled')) {
      cy.wrap($el).click({ force: true });
    } else {
      cy.get('[class^="button-variable-item"]').not('.disabled').first().click({ force: true });
    }
  });

  cy.get('.button-variable-item-Green').then(($el) => {
    if ($el.length && !$el.hasClass('disabled')) {
      cy.wrap($el).click({ force: true });
    } else {
      cy.get('[class^="button-variable-item"]').not('.disabled').first().click({ force: true });
    }
  });
}

describe('[US-0001] Adicionar item ao carrinho', () => {
  beforeEach(() => {
    cy.visit('http://localhost/product/abominable-hoodie/');
  });

  it('Adicionar item ao carrinho com tamanho XL e cor Green (ou próximo disponível)', () => {
    selecionarVariacoes();

    cy.get('.single_add_to_cart_button').click({ force: true });
    selecionarVariacoes();
    cy.get('.single_add_to_cart_button').click({ force: true });

    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a').contains('Ver carrinho').click({ force: true });
  });

  it('Adicionar dois itens iguais ao carrinho', () => {
    selecionarVariacoes();

    cy.get('.single_add_to_cart_button').click({ force: true });
    selecionarVariacoes();
    cy.get('.single_add_to_cart_button').click({ force: true });
       cy.get('.plus').click({ force: true });

    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a').contains('Ver carrinho').click({ force: true });
    
   
  });

  it('Adicionar e remover item do carrinho', () => {

   selecionarVariacoes();

    cy.get('.single_add_to_cart_button').click({ force: true });
    selecionarVariacoes();
    cy.get('.single_add_to_cart_button').click({ force: true });

    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a').contains('Ver carrinho').click({ force: true });
    // Clica no botão de remover item do carrinho
    cy.get('.remove > .fa').click({ force: true });

// Confirma que o carrinho está vazio
    cy.contains('Seu carrinho está vazio.').should('be.visible');

  });
});
