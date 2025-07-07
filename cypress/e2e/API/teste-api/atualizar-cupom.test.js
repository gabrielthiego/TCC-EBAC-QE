const request = require('supertest');

const auth = {
  user: 'admin_ebac',
  pass: '@admin!&b@c!2022',
};

const api = request('http://localhost/wp-json/wc/v3');

function gerarCodigoCupom(prefixo = 'cupom') {
  return `${prefixo}_${Math.random().toString(36).substring(2, 8)}`;
}

describe('Fluxo completo do cupom', () => {
  let cupomId;
  let codigoCupom;

  it('Deve criar um cupom com código aleatório', async () => {
    codigoCupom = gerarCodigoCupom();
    const response = await api
      .post('/coupons')
      .auth(auth.user, auth.pass)
      .send({
        code: codigoCupom,
        amount: '22.00',
        discount_type: 'fixed_cart',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(codigoCupom);
    expect(response.body.amount).toBe('22.00');

    cupomId = response.body.id;
    expect(cupomId).toBeDefined();
  });

  it('Deve atualizar o cupom criado', async () => {
    const response = await api
      .put(`/coupons/${cupomId}`)
      .auth(auth.user, auth.pass)
      .send({
        amount: '30.00',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.amount).toBe('30.00');
  });

  it('Deve consultar o cupom atualizado', async () => {
    const response = await api
      .get(`/coupons/${cupomId}`)
      .auth(auth.user, auth.pass);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(codigoCupom);
    expect(response.body.amount).toBe('30.00');
  });
});
