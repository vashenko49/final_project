export default class AdminProductAPI {
  static getProducts() {
    return new Promise((resolve, reject) => {
      resolve([
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' },
        { id: 3, title: 'Product 3' },
        { id: 4, title: 'Product 4' },
        { id: 5, title: 'Product 5' }
      ]);
    });
  }
}
