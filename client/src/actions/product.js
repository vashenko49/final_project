import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  REQUEST_PRODUCT,
  COMMENT_ERROR,
  GET_COMMENT,
  EDIT_SELECTED_IMG,
  SELECT_FILTER
} from '../constants/product';
import ProductAPI from '../services/ProductAPI';
import _ from 'lodash';

export const getCurrentProduct = productId => async dispatch => {
  try {
    const res = await ProductAPI.getCurrentProduct(productId);

    dispatch({
      type: REQUEST_PRODUCT
    });
    const massImg = [];
    const filtersByUser = [];
    const {
      enabled,
      description,
      comments,
      productUrlImg,
      nameProduct,
      _idChildCategory: {
        name: nameChildCatalog,
        _id: _idChildCategory,
        parentId: { name: nameRootCatalog }
      },
      filters,
      filterImg,
      model,
      itemNo,
      htmlPage
    } = res;

    filterImg.forEach(item => {
      massImg.push(...item.urlImg);
    });
    massImg.push(...productUrlImg);

    if (model.length > 0) {
      model[0].filters.forEach(item => {
        const { filter } = item;
        filtersByUser.push({
          idFilter: filter._id,
          nameFilter: filter.type,
          subFilters: []
        });
      });
    }

    model.forEach(item => {
      const { filters } = item;
      filtersByUser.forEach((filItem, index) => {
        const { idFilter } = filItem;
        const selectFilter = _.findIndex(filters, function(o) {
          return o.filter._id.toString() === idFilter.toString();
        });
        filtersByUser[index].subFilters.push({
          idSubFilter: filters[selectFilter].subFilter._id,
          nameSubFilter: filters[selectFilter].subFilter.name,
          statusSelect: false,
          statusDisable: false
        });
      });
    });

    dispatch({
      type: GET_PRODUCT,
      payload: {
        enabled,
        description,
        comments,
        productUrlImg,
        _idChildCategory,
        nameProduct,
        nameChildCatalog,
        nameRootCatalog,
        filters,
        filterImg,
        model,
        itemNo,
        htmlPage,
        price: `${
          _.minBy(model, function(o) {
            return o.currentPrice;
          }).currentPrice
        } - ${
          _.maxBy(model, function(o) {
            return o.currentPrice;
          }).currentPrice
        }`,
        selectedIndexImg: 0,
        massImg,
        filtersByUser
      }
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
};

export const getMeanRatingProductByProductId = productId => async dispatch => {
  try {
    const res = await ProductAPI.getMeanRatingProductByProductId(productId);
    dispatch({
      type: GET_COMMENT,
      payload: {
        rating: res.rating
      }
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR
    });
  }
};

export const changeImg = selectedIndexImg => dispatch => {
  dispatch({
    type: EDIT_SELECTED_IMG,
    payload: {
      selectedIndexImg: selectedIndexImg
    }
  });
};

export const selectFilter = (
  subFilterId,
  filtersByUser,
  selectedFilter,
  model,
  productUrlImg,
  filterImg
) => dispatch => {
  const selectedSubFilter = _.findIndex(selectedFilter, function(o) {
    return o === subFilterId;
  });

  if (selectedSubFilter < 0) {
    selectedFilter.push(subFilterId);
  } else {
    selectedFilter.splice(selectedSubFilter, 1);
  }

  if (selectedFilter.length > 0) {
    model = model.filter(mod => {
      const { filters } = mod;
      return _.xor(
        selectedFilter.map(selectedItem => {
          let tempResponse = false;
          filters.forEach(filterModel => {
            if (selectedItem.toString() === filterModel.subFilter._id) {
              tempResponse = true;
            }
          });
          return tempResponse;
        })
      )[0];
    });

    const fitSubfilter = [];
    model.forEach(item => {
      const { filters } = item;
      filters.forEach(itemFilMod => {
        const {
          subFilter: { _id: idSubFilter }
        } = itemFilMod;
        fitSubfilter.push(idSubFilter);
      });
    });

    filtersByUser = filtersByUser.map(item => {
      let { subFilters } = item;
      subFilters = subFilters.map(itemSubFilter => {
        const { idSubFilter } = itemSubFilter;
        const fitIdSubFilter = _.findIndex(fitSubfilter, function(o) {
          return o.toString() === idSubFilter.toString();
        });
        const selectedIdSubFilter = _.findIndex(selectedFilter, function(o) {
          return o.toString() === idSubFilter;
        });
        if (selectedIdSubFilter >= 0) {
          itemSubFilter.statusSelect = true;
        }
        if (fitIdSubFilter < 0) {
          itemSubFilter.statusDisable = true;
        }
        return {
          ...itemSubFilter
        };
      });
      return {
        ...item,
        subFilters: subFilters
      };
    });
    const newMassImg = [];

    filterImg.forEach(item => {
      const {
        _idSubFilters: { _id },
        urlImg
      } = item;
      const selectSubFilter = _.findIndex(fitSubfilter, function(o) {
        return o.toString() === _id.toString();
      });
      if (selectSubFilter >= 0) {
        newMassImg.push(...urlImg);
      }
    });
    newMassImg.push(...productUrlImg);

    dispatch({
      type: SELECT_FILTER,
      payload: {
        massImg: newMassImg,
        filtersByUser: filtersByUser,
        selectedFilter: selectedFilter,
        fitModelCount: model.length,
        pretenderModel: model.length === 1 ? model[0].modelNo : ''
      }
    });
  } else {
    filtersByUser = filtersByUser.map(item => {
      let { subFilters } = item;

      subFilters = subFilters.map(itemSubFilter => {
        return {
          ...itemSubFilter,
          statusSelect: false,
          statusDisable: false
        };
      });

      return {
        ...item,
        subFilters: subFilters
      };
    });

    const newMassImg = [];

    filterImg.forEach(item => {
      const { urlImg } = item;
      newMassImg.push(...urlImg);
    });
    newMassImg.push(...productUrlImg);

    dispatch({
      type: SELECT_FILTER,
      payload: {
        massImg: newMassImg,
        filtersByUser: filtersByUser,
        selectedFilter: [],
        fitModelCount: 0,
        pretenderModel: ''
      }
    });
  }
};
