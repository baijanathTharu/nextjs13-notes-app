import { randomBytes } from 'crypto';

export function generateRandomId() {
  const id = randomBytes(20).toString('hex');
  return id;
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
export function asyncComponent<T, R>(
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  return fn as (arg: T) => R;
}
