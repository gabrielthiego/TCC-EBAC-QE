import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '1m40s', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  // LOGIN
  const loginPayload = JSON.stringify({
    username: 'ebactcc',
    password: 'ebactcc',
  });

  const loginParams = {
    headers: { 'Content-Type': 'application/json' },
  };

  const loginRes = http.post('http://localhost:8000/wp-json/jwt-auth/v1/token', loginPayload, loginParams);

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
    'received token': (r) => r.json('token') !== '',
  });

  const token = loginRes.json('token');

  console.log(`Token recebido: ${token}`);

  // GET POSTS
  const postsParams = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const postsRes = http.get('http://localhost:8000/wp-json/wp/v2/posts', postsParams);

  check(postsRes, {
    'GET posts status 200': (r) => r.status === 200,
  });

  console.log(`Status GET posts: ${postsRes.status}`);
}