/// <reference types="cypress" />

describe('[US-0002] Login na plataforma', () => {
  const url = 'http://lojaebac.ebaconline.art.br/';
  const validUser = 'user1_ebac';
  const validPass = 'psw!ebac@test';
  const invalidUser = 'invalido_ebac';
  const invalidPass = 'senhaerrada';

  beforeEach(() => {
    cy.visit(`${url}minha-conta`);
  });

  it('Cenário 1: Login com sucesso (caminho feliz)', () => {
    cy.get('#username').type(validUser);
    cy.get('#password').type(validPass);
    cy.get('button[name="login"]').click();
    cy.contains('Olá,').should('be.visible');
  });

  it('Cenário 2: Login com usuário inválido (fluxo alternativo)', () => {
    cy.get('#username').type(invalidUser);
    cy.get('#password').type(validPass);
    cy.get('button[name="login"]').click();
    cy.contains('Erro:').should('be.visible');
  });

  it('Cenário 3: Login com senha inválida (fluxo alternativo)', () => {
    cy.get('#username').type(validUser);
    cy.get('#password').type(invalidPass);
    cy.get('button[name="login"]').click();
    cy.contains('Erro:').should('be.visible');
  });

  it('Cenário 4: Login com campos vazios (fluxo negativo)', () => {
    cy.get('button[name="login"]').click();
    cy.contains('Erro:').should('be.visible');
  });
});
