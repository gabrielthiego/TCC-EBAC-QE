import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 20 },  // ramp-up 20 usuários
    { duration: '1m40s', target: 20 }, // manter 20 usuários
    { duration: '30s', target: 0 },    // ramp-down
  ],
};

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNzUyMDgzNDg1LCJuYmYiOjE3NTIwODM0ODUsImV4cCI6MTc1MjY4ODI4NSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.mgPlmk1SoX5CoYyk2jZf4Dw_HwYl70hpxSei8J31Po4';

export default function () {
  const url = 'http://localhost/wp-json/wp/v2/posts';
  const res = http.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(res, {
    'GET posts status 200': (r) => r.status === 200,
  });
}