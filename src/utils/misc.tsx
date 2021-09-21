import { customAlphabet } from 'nanoid/non-secure';
import { idPrefix } from '../interfaces/db';

export const isNativeApp = () => false;

export const apiUrl = () => 'http://localhost:8000';

export function generateId(firstChar: idPrefix) {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 4);
  return firstChar + nanoid() + Date.now();
}
