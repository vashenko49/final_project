import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import objectToFormData from 'object-to-formdata';
import axios from 'axios';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        _idProduct: '5defcf29926cae49408acfd4',
        productUrlImg: [
          'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/neylgwflbida7kkynnqk',
          'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/ajbk47cetr41jr7cdcxy'
        ],
        _idChildCategory: '5de02b89e8a23045f0c1559c',
        filters: [
          {
            filter: '5de027f4e8a23045f0c15580',
            subFilter: '5de0296de8a23045f0c15583'
          }
        ],
        filterImg: [
          {
            _idFilter: '5de02aece8a23045f0c1559b',
            _idSubFilters: '5de02a12e8a23045f0c1558c',
            urlImg: [
              'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/tmocosoer3xaiiuytemr',
              'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/gm5aljpf8igt8pzheivk',
              'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/orwzfivmwt4wfzmo0pq4'
            ]
          },
          {
            _idFilter: '5de02aece8a23045f0c1559b',
            _idSubFilters: '5de02aece8a23045f0c15593',
            urlImg: [
              'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/fv7qmrcxqqhedv8zcbx2',
              'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/e9vghiln6xer9ahrhpnt',
              'final-project/products/catalog-5de02b89e8a23045f0c1559c/9202-550397-1197/mqkq2jh7qvftbnl0dz0t'
            ]
          }
        ],
        model: [
          {
            quantity: 55,
            currentPrice: 160,
            filters: [
              {
                filter: '5de02aece8a23045f0c1559b',
                subFilter: '5de02a12e8a23045f0c1558c'
              }
            ]
          },
          {
            quantity: 53,
            currentPrice: 260,
            filters: [
              {
                filter: '5de02aece8a23045f0c1559b',
                subFilter: '5de02aece8a23045f0c15593'
              }
            ]
          },
          {
            quantity: 53,
            currentPrice: 260,
            filters: [
              {
                filter: '5de02aece8a23045f0c1559b',
                subFilter: '5de02aece8a23045f0c15593'
              }
            ]
          }
        ]
      }
    };

    this.handleChangeProductUrlImg = this.handleChangeProductUrlImg.bind(this);
    this.handleChangeFilterImg = this.handleChangeFilterImg.bind(this);
  }

  handleChangeProductUrlImg = event => {
    console.log(event.target.files);
    let { formData } = this.state;
    formData.productUrlImg.push(...event.target.files);
    this.setState({ formData });
    console.log(this.state.formData);
  };

  // это пример простой, в полной версии нужно котролировать добавление новых обьектов файлов и когда пользователь выгрузил из формы файл
  handleChangeFilterImg = event => {
    const { formData } = this.state;
    console.dir(event.target);

    let _idSubfilter = event.target.dataset.index;

    formData.filterImg = formData.filterImg.map(element => {
      if (element._idSubFilters === _idSubfilter) {
        element.urlImg.push(
          ...(() => {
            for (let i = 0; i < event.target.files.length; i++) {
              event.target.files[i]._idSubfilter = _idSubfilter;
            }
            return event.target.files;
          })()
        );
      }
      return element;
    });
    this.setState({ formData });
    console.log(this.state.formData);
  };
  handleSubmit = event => {
    event.preventDefault();
    const { formData } = this.state;
    const options = {
      indices: true,
      nullsAsUndefineds: true
    };

    const formdata = objectToFormData(formData, options);

    axios
      .put('/products', formdata)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <Box p={3}>
          <input multiple onChange={this.handleChangeProductUrlImg} name="userAvatar" type="file" />
        </Box>
        <Box p={3}>
          <input
            data-index={'5de02a12e8a23045f0c1558c'}
            multiple
            onChange={this.handleChangeFilterImg}
            name="userAvatar"
            type="file"
          />
        </Box>
        <Box p={3}>
          <input
            data-index={'5de02aece8a23045f0c15593'}
            multiple
            onChange={this.handleChangeFilterImg}
            name="userAvatar"
            type="file"
          />
        </Box>
        <Box mt={1}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </ValidatorForm>
    );
  }
}

export default UpdateProduct;
