import { randomBytes } from 'crypto';

export function generateRandomId() {
  const id = randomBytes(20).toString('hex');
  return id;
}
