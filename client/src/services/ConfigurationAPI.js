import axios from 'axios';

export default class ConfigurationAPI {
  static getConfigForClient = () => {
    return axios.get('/configs/use/client').then(value => value.data);
  };
}
