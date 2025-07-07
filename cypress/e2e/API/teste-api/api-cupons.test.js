const request = require('supertest')('http://localhost');
const auth = { user: 'admin_ebac', pass: '@admin!&b@c!2022' };

describe('API Cupom', () => {
  let cupomId;

  beforeAll(async () => {
    const response = await request
      .get('/wp-json/wc/v3/coupons?code=nomecupom2022')
      .auth(auth.user, auth.pass);

    if (response.body.length > 0) {
      cupomId = response.body[0].id;
    } else {
      throw new Error('Cupom nomecupom2022 não encontrado');
    }
  });

  it('Deve validar os dados do cupom nomecupom2022', async () => {
    const response = await request
      .get(`/wp-json/wc/v3/coupons/${cupomId}`)
      .auth(auth.user, auth.pass);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe('nomecupom2022');
    expect(response.body.amount).toBeDefined(); // Checa se tem valor definido
  });
});