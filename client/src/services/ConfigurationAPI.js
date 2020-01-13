import axios from 'axios';

export default class ConfigurationAPI {
  static getConfigForClient = () => {
    return axios.get('/api/configs/use/client').then(value => value.data);
  };
  static getConfigs = () => {
    return axios.get('/api/configs').then(value => value.data);
  };
  static createNewConfig = data => {
    return axios.post('/api/configs', data).then(value => value.data);
  };
  static updateConfig = data => {
    return axios.put('/api/configs', data).then(value => value.data);
  };
  static removeConfig = id => {
    return axios.delete(`/api/configs/${id}`).then(value => value.data);
  };
  static switchActiveConfig = () => {
    return axios.get('/api/configs/use').then(value => value.data);
  };
}
