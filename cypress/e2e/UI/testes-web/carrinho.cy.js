function selecionarVariacoes() {
  cy.get('.button-variable-item-XL', { timeout: 10000 }).then(($el) => {
    if ($el.length && !$el.hasClass('disabled')) {
      cy.wrap($el).click({ force: true });
    } else {
      cy.get('[class^="button-variable-item"]', { timeout: 10000 }).not('.disabled').first().click({ force: true });
    }
  });

  cy.get('.button-variable-item-Green', { timeout: 10000 }).then(($el) => {
    if ($el.length && !$el.hasClass('disabled')) {
      cy.wrap($el).click({ force: true });
    } else {
      cy.get('[class^="button-variable-item"]', { timeout: 10000 }).not('.disabled').first().click({ force: true });
    }
  });
}

describe('[US-0001] Adicionar item ao carrinho', () => {
  beforeEach(() => {
    cy.visit('http://localhost/product/abominable-hoodie/', { timeout: 10000 });
  });

  it('Adicionar item ao carrinho com tamanho XL e cor Green (ou próximo disponível)', () => {
    selecionarVariacoes();

    cy.get('.single_add_to_cart_button', { timeout: 10000 }).click({ force: true });
    selecionarVariacoes();
    cy.get('.single_add_to_cart_button', { timeout: 10000 }).click({ force: true });

    cy.get('.woocommerce-message', { timeout: 10000 }).should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a', { timeout: 10000 }).contains('Ver carrinho').click({ force: true });

  });

  it('Adicionar dois itens iguais ao carrinho', () => {
    selecionarVariacoes();

    cy.get('.single_add_to_cart_button', { timeout: 50000 }).click({ force: true });
    selecionarVariacoes();
    cy.get('.single_add_to_cart_button', { timeout: 50000 }).click({ force: true });

    cy.get('.plus', { timeout: 50000 }).click({ force: true });

    cy.get('.woocommerce-message', { timeout: 50000 }).should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a', { timeout: 50000 }).contains('Ver carrinho').click({ force: true });
  });

  it('Adicionar e remover item do carrinho', () => {
    selecionarVariacoes();

    cy.get('.single_add_to_cart_button', { timeout: 10000 }).click({ force: true });
    selecionarVariacoes();
    cy.get('.single_add_to_cart_button', { timeout: 10000 }).click({ force: true });

    cy.get('.woocommerce-message', { timeout: 10000 }).should('contain', 'foi adicionado no seu carrinho');
    cy.get('.woocommerce-message a', { timeout: 10000 }).contains('Ver carrinho').click({ force: true });

    cy.get('.remove > .fa', { timeout: 10000 }).click({ force: true });

    cy.contains('Seu carrinho está vazio.', { timeout: 50000 }).should('be.visible');


  });
});