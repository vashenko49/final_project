import CartAPI from '../services/CartAPI';
import _ from 'lodash';
import { GET_ITEMS, UPDATE_ITEM, ITEMS_ERROR, RESET_ITEM } from '../constants/cart';
import AdminProductAPI from '../services/AdminProductsAPI';
import * as AUTHORIZATION from '../constants/authorization';
import AuthorizationAPI from '../services/AuthorizationAPI';
import setAuthToken from '../utils/setAuthToken';

export function loginInSystem(userData, callback) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_REQUEST
    });

    callback(userData)
      .then(res => {
        const { token } = res;
        dispatch({
          type: AUTHORIZATION.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: token
        });

        AuthorizationAPI.getCustomerUsingToken(token)
          .then(res => {
            localStorage.setItem('Authorization', token);
            setAuthToken(token);
            res.token = token;
            dispatch({
              type: AUTHORIZATION.LOG_IN_API_SUCCEEDED,
              payload: res
            });
          })
          .catch(async e => {
            throw e;
          })
          .finally(() => {
            getCurrentCart(dispatch);
          });
      })
      .catch(() => {
        localStorage.removeItem('Authorization');
        return dispatch({
          type: AUTHORIZATION.LOG_IN_API_FAILED
        });
      });
  };
}

export function failSocial() {
  return dispatch => {
    localStorage.removeItem('Authorization');
    dispatch({
      type: AUTHORIZATION.LOG_IN_API_FAILED
    });
  };
}

export function openWindowAuth() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.OPEN_WINDOW_AUTH
    });
  };
}

export function closeWindowAuth() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.CLOSE_WINDOW_AUTH
    });
  };
}

export function AuthorizationThroughLocalStorage(token) {
  return dispatch => {
    if (!token) {
      getCurrentCart(dispatch);
    } else {
      AuthorizationAPI.getCustomerUsingToken(token)
        .then(res => {
          localStorage.setItem('Authorization', token);
          setAuthToken(token);
          res.token = token;
          return dispatch({
            type: AUTHORIZATION.LOG_IN_API_SUCCEEDED,
            payload: res
          });
        })
        .catch(() => {
          localStorage.removeItem('Authorization');
          return dispatch({
            type: AUTHORIZATION.LOG_IN_API_FAILED
          });
        })
        .finally(() => {
          getCurrentCart(dispatch);
        });
    }
  };
}

export function updatePersonalData(data) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.UPDATE_PERSONAL_DATA_API_REQUEST
    });
    AuthorizationAPI.updatePersonalData(data)
      .then(res => {
        return dispatch({
          type: AUTHORIZATION.UPDATE_PERSONAL_DATA_API_SUCCEEDED,
          payload: res
        });
      })
      .catch(err => {
        return dispatch({
          type: AUTHORIZATION.UPDATE_PERSONAL_DATA_API_ERROR,
          payload: err.response.data.message
        });
      });
  };
}

export function resetPassword(data) {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.RESET_PASSWORD_API_REQUEST
    });
    AuthorizationAPI.resetPassword(data)
      .then(res => {
        return dispatch({
          type: AUTHORIZATION.RESET_PASSWORD_DATA_API_SUCCEEDED,
          payload: res.message
        });
      })
      .catch(err => {
        return dispatch({
          type: AUTHORIZATION.RESET_PASSWORD_DATA_API_ERROR,
          payload: err.response.data.message
        });
      });
  };
}

export function resetError() {
  return dispatch => {
    dispatch({
      type: AUTHORIZATION.RESET_ERROR
    });
  };
}

export function signOut() {
  return dispatch => {
    localStorage.removeItem('Authorization');
    dispatch({
      type: AUTHORIZATION.LOG_OUT
    });
    setAuthToken();
    getCurrentCart(dispatch);
  };
}

export function replaceWithOnlineCart(onlineCart) {
  return dispatch => {
    let localCart = JSON.parse(localStorage.getItem('localCart'));
    if (_.isArray(localCart) && localCart.length > 0) {
      localCart.push(
        ...onlineCart
          .filter(item => {
            const {
              idProduct: { _id: idProduct },
              modelNo: { modelNo }
            } = item;
            const selectProduct = _.findIndex(localCart, function(o) {
              return (
                o.idProduct.toString() === idProduct.toString() &&
                o.modelNo.toString() === modelNo.toString()
              );
            });
            return selectProduct < 0;
          })
          .map(item => {
            const {
              idProduct: { _id: idProduct },
              modelNo: { modelNo },
              quantity
            } = item;
            return {
              idProduct,
              modelNo,
              quantity
            };
          })
      );

      localCart = localCart.map(item => {
        const { quantity } = item;
        return {
          ...item,
          quantity: +quantity
        };
      });
      localStorage.removeItem('localCart');
      CartAPI.updateCart({ products: localCart }).then(() => {
        getCurrentCart(dispatch);
      });
    }
  };
}

export function getCurrentItems() {
  return dispatch => {
    getCurrentCart(dispatch);
  };
}

// Get items
function getCurrentCart(dispatch) {
  try {
    CartAPI.getCustomerCart()
      .then(res => {
        dispatch({
          type: GET_ITEMS,
          payload: { products: res.products, isLocalCart: false }
        });
      })
      .catch(async () => {
        let localCart = JSON.parse(localStorage.getItem('localCart'));
        if (!_.isArray(localCart)) {
          localStorage.setItem('localCart', JSON.stringify([]));
          dispatch({
            type: GET_ITEMS,
            payload: {
              products: [],
              isLocalCart: true
            }
          });
        } else {
          localCart = await Promise.all(
            localCart.map(async item => {
              let { idProduct, modelNo, quantity } = item;
              idProduct = (await AdminProductAPI.getProductsById(idProduct)).data;
              idProduct.model.forEach(mod => {
                if (modelNo === mod.modelNo.toString()) {
                  modelNo = mod;
                }
              });
              return {
                idProduct,
                modelNo,
                quantity
              };
            })
          );
          dispatch({
            type: GET_ITEMS,
            payload: {
              products: localCart,
              isLocalCart: true
            }
          });
        }
      });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: err
    });
  }
}

export function updateQuantity(productId, modelNo, quantity) {
  return async dispatch => {
    try {
      CartAPI.updateQuantity(productId, modelNo, parseInt(quantity))
        .then(res => {
          dispatch({
            type: UPDATE_ITEM,
            payload: { products: res.products, isLocalCart: false }
          });
        })
        .catch(async () => {
          let localCart = JSON.parse(localStorage.getItem('localCart'));
          if (!_.isArray(localCart)) {
            let newCArt = {};
            if (parseInt(quantity) > 0) {
              newCArt = {
                idProduct: productId,
                modelNo: modelNo,
                quantity: quantity
              };
            }
            localCart = [newCArt];
          } else {
            if (quantity <= 0) {
              localCart = localCart.filter(item => {
                return item.modelNo.toString() !== modelNo.toString();
              });
            } else {
              const selectItem = _.findIndex(localCart, function(o) {
                return (
                  o.modelNo.toString() === modelNo.toString() &&
                  o.idProduct.toString() === productId.toString()
                );
              });
              if (selectItem < 0) {
                localCart.push({
                  idProduct: productId,
                  modelNo: modelNo,
                  quantity: quantity
                });
              } else {
                localCart[selectItem].quantity = quantity;
              }
            }
          }
          localStorage.setItem('localCart', JSON.stringify(localCart));
          getCurrentCart(dispatch);
        });
    } catch (err) {
      dispatch({
        type: ITEMS_ERROR,
        payload: err
      });
    }
  };
}

export function resetCart() {
  return dispatch => {
    localStorage.removeItem('localCart');
    dispatch({
      type: RESET_ITEM
    });
  };
}
