export default class AdminBrandsAPI {
  static getBrands() {
    return new Promise((resolve, reject) => {
      resolve([
        { id: 1, title: 'Nike' },
        { id: 2, title: 'Adidas' },
        { id: 3, title: 'Jordan' },
        { id: 4, title: 'Gucci' },
        { id: 5, title: 'Puma' },
        { id: 6, title: 'Reebok' }
      ]);
    });
  }
}
