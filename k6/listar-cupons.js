import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'http://192.168.0.62:80/wp-json/wc/v3/coupons?consumer_key=seu_consumer_key_aqui&consumer_secret=seu_consumer_secret_aqui';

  const res = http.get(url);

  check(res, {
    'status 200': (r) => r.status === 200,
  });

  sleep(1);
}