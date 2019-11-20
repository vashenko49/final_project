export default class AdminProductAPI {
  static getProducts() {
    return new Promise((resolve, reject) => {
      resolve([
        { title: 'Product 1' },
        { title: 'Product 2' },
        { title: 'Product 3' },
        { title: 'Product 4' },
        { title: 'Product 5' }
      ]);
    });
  }

  static addProduct(data) {
    console.log('API ADD PRODUCT --> done');
  }
}
