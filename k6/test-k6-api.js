import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '1m40s', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

const loginUrl = 'http://localhost:8000/wp-json/jwt-auth/v1/token';
const apiUrl = 'http://localhost:8000/wp-json/wc/v3/coupons';

export default function () {
  // Login para pegar token
  const loginPayload = JSON.stringify({ username: 'ebactcc', password: 'ebactcc' });
  const loginParams = { headers: { 'Content-Type': 'application/json' } };

  const loginRes = http.post(loginUrl, loginPayload, loginParams);
  check(loginRes, { 'login status 200': (r) => r.status === 200 });

  const token = loginRes.json('token');
  if (!token) {
    console.error('Token não recebido');
    return;
  }

  // Requisição protegida com token dinâmico
  const apiParams = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(apiUrl, apiParams);
  check(res, { 'API status 200': (r) => r.status === 200 });

  console.log(`Resposta API: ${res.status}`);
}