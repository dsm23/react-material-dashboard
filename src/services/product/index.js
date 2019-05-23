// Mock data
import products from 'data/products';

export const getProducts = (limit = 6) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        products: products.slice(0, limit),
        productsTotal: products.length,
      });
    }, 700);
  });
