require('dotenv').config();
const request = require('supertest');

const auth = {
  user: process.env.USERNAME,
  pass: process.env.PASSWORD,
};

const api = request('http://localhost/wp-json/wc/v3');

function gerarCodigoCupom(prefixo = 'cupom') {
  const sufixo = Math.random().toString(36).substring(2, 8);
  return `${prefixo}_${sufixo}`;
}

describe('Criar cupom', () => {
  it('Deve criar o cupom com nome aleatório', async () => {
    const codigoCupom = gerarCodigoCupom();

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
  });
});