const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:80',
    specPattern: 'UI/testes-web/**/carrinho.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
     
    }
  }
})
