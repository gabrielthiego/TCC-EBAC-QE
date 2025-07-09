import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta veio com conteúdo': (r) => r.body && r.body.length > 0,
  });
  sleep(1);
}