import axios from "axios";

export default class CartAPI {

  _apiBase = 'http://localhost:5000/cart';

  static getCustomerCart(){
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.get(`/cart/${id}`, config);


  }
}