const { expect, browser, $ } = require('@wdio/globals')

describe('Teste básico do app mobile', () => {
    it('deve abrir o app e mostrar texto de login', async () => {
        // Aqui não precisa de browser.url, o app já abre direto
        const loginText = await $('android=new UiSelector().text("Login")')
        await loginText.waitForDisplayed({ timeout: 5000 })
        await expect(loginText).toBeExisting()
    })
})