import axios from 'axios';

export default class FavouritesAPI {
  static async getFavourites() {
    return await axios.get(`/api/favourites`).then(res => res.data);
  }
  static async removeFromFavourites(idProduct) {
    return await axios.delete(`/api/favourites/${idProduct}`).then(res => res.data);
  }
  static async productIsFavourites(idProduct) {
    return await axios.get(`/api/favourites/${idProduct}`).then(res => res.data);
  }
  static async addToFavourites(idProduct) {
    return await axios.post(`/api/favourites/${idProduct}`).then(res => res.data);
  }
}
