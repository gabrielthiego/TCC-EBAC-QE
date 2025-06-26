const request = require('supertest');

const baseUrl = 'http://lojaebac.ebaconline.art.br/wp-json/wc/store/v1';

describe('[US-0003] API de Cupons', () => {
  it('Cenário 1: Validar cupom existente (caminho feliz)', async () => {
    const response = await request(baseUrl).get('/coupons/10off');
    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe('10off');
    expect(response.body.amount).toBe('10');
  });

  it('Cenário 2: Validar cupom inexistente (fluxo alternativo)', async () => {
    const response = await request(baseUrl).get('/coupons/naoexiste');
    expect(response.statusCode).toBe(404);
  });

  it('Cenário 3: Verificar estrutura do contrato do cupom', async () => {
    const response = await request(baseUrl).get('/coupons/10off');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('code');
    expect(response.body).toHaveProperty('amount');
  });

  it('Cenário 4: Validar resposta sem autenticação (se necessário)', async () => {
    const response = await request(baseUrl).get('/coupons/10off');
    expect(response.statusCode).toBeLessThan(500); // assumindo que não exige auth
  });
});
