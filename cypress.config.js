const { defineConfig } = require('cypress')

module.exports = defineConfig({
 e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    baseUrl: 'http://localhost:80',
    specPattern: 'cypress/e2e/UI/testes-web/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      
    },
  },
})
