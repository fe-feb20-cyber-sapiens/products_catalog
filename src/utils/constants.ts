import { getNumbers } from './utils';

export const itemsTotal = 95;
export const pageByDefault = 1;
export const itemsByDefault = 16;
export const itemsPerPageOptions = ['16', '32', '64'];
export const sortOptions = ['Newest', 'Discount', 'Price'];

export const items = getNumbers(1, itemsTotal)
  .map(n => `Item ${n}`);

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

export const BASE_URL = 'https://products-catalog-api.onrender.com';
