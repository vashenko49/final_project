import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import objectToFormData from 'object-to-formdata';
import axios from 'axios';

// файл для экспериментов потом удалим
class CreateProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        productUrlImg: [],
        nameProduct: 'Court Air Zoom Vapor X',
        _idChildCategory: '5de02b89e8a23045f0c1559c',
        description:
          'With Nike Zoom Air and a Dynamic Fit system, the NikeCourt Air Zoom Vapor X provides ultimate control on hard courts. The Dynamic Fit system wraps your foot from the bottom of the arch up to the laces for a glove-like fit. A Zoom Air unit in the heel offers low-profile, resilient cushioning from swing to swing.The full-length TPU foot frame wraps up the outside of your foot for added stability on every turn and swing. The full-length TPU foot frame wraps up the outside of your foot for added stability on every turn and swing.The full-length TPU foot frame wraps up the outside of your foot for added stability on every turn and swing. The full-length TPU foot frame wraps up the outside of your foot for added stability on every turn and swing. The full-length TPU foot frame wraps up the outside of your foot for added stability on every turn and swing.',
        filters: [
          {
            filter: '5de027f4e8a23045f0c15580',
            subFilter: '5de0296de8a23045f0c15583'
          }
        ],
        htmlPage: '<div>gogo ogo oggfdjgouifhgiufd </div>',
        filterImg: [
          {
            _idFilter: '5de02aece8a23045f0c1559b',
            _idSubFilters: '5de02a12e8a23045f0c1558c',
            urlImg: []
          },
          {
            _idFilter: '5de02aece8a23045f0c1559b',
            _idSubFilters: '5de02aece8a23045f0c15593',
            urlImg: []
          },
          {
            _idFilter: '5de02aece8a23045f0c1559b',
            _idSubFilters: '5de02aece8a23045f0c15599',
            urlImg: []
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
                subFilter: '5de02aece8a23045f0c15599'
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
    formData.productUrlImg = event.target.files;
    this.setState({ formData });
    console.log(this.state.formData);
  };
  handleChangeFilterImg = event => {
    const { formData } = this.state;
    console.dir(event.target);

    let _idSubfilter = event.target.dataset.index;

    formData.filterImg = formData.filterImg.map(element => {
      if (element._idSubFilters === _idSubfilter) {
        element.urlImg = event.target.files;
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

    /*
     *
     * очень важно !!!!!!!!!!
     * не передавать обьект filterImg без фото
     *
     * */
    axios
      .post('/products', formdata)
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
        <Box>
          <input multiple onChange={this.handleChangeProductUrlImg} name="userAvatar" type="file" />
        </Box>
        <Box>
          <input
            data-index={'5de02a12e8a23045f0c1558c'}
            multiple
            onChange={this.handleChangeFilterImg}
            name="userAvatar"
            type="file"
          />
        </Box>
        <Box>
          {/* {data-index храню id subfilter что бы отслеживать куда ложить файлы} */}
          <input
            data-index={'5de02aece8a23045f0c15593'}
            multiple
            onChange={this.handleChangeFilterImg}
            name="userAvatar"
            type="file"
          />
        </Box>
        <Box>
          {/* {data-index храню id subfilter что бы отслеживать куда ложить файлы} */}
          <input
            data-index={'5de02aece8a23045f0c15599'}
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

export default CreateProducts;
