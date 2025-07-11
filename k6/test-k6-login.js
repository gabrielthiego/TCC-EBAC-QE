import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '1m40s', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

const loginUrl = 'http://localhost/wp-json/jwt-auth/v1/token';

const payload = JSON.stringify({
  username: 'tccebac',
  password: 'tccebac',
});

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  const res = http.post(loginUrl, payload, params);

  check(res, {
    'login status 200': (r) => r.status === 200,
    'received token': (r) => {
      const body = r.json();
      return body && body.data && typeof body.data.token === 'string' && body.data.token.length > 10;
    },
  });

  console.log(res.body); // mostra a resposta bruta no terminal
}