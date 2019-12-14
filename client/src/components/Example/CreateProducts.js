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
        nameProduct: 'New Balance Fresh Foam 1080v10',
        _idChildCategory: '5de02b89e8a23045f0c1559c',
        description:
          'The Fresh Foam 1080v10 is our premium expression of runner’s data, supreme comfort, and cutting-edge design. The new Fresh Foam X midsole delivers enhanced softness and a more energetic rebound than its predecessor. Experience 360 degrees of comfort with a soft fitting knit upper and Ultra Heel in a stylish new look. ',
        filters: [
          {
            filter: '5de02aece8a23045f0c1559b',
            subFilter: '5de02aece8a23045f0c15593'
          }
        ],
        htmlPage: '<div>gogo ogo oggfdjgouifhgiufd </div>',
        filterImg: [
          {
            _idFilter: '5de575a65ac80a23483fece7',
            _idSubFilters: '5de575945ac80a23483fece6',
            urlImg: []
          },
          {
            _idFilter: '5de575a65ac80a23483fece7',
            _idSubFilters: '5de7697d535af507733c22b0',
            urlImg: []
          },
          {
            _idFilter: '5de575a65ac80a23483fece7',
            _idSubFilters: '5df507faa4660f32442a0f41',
            urlImg: []
          }
        ],
        model: [
          {
            quantity: 55,
            currentPrice: 160,
            filters: [
              {
                filter: '5de027f4e8a23045f0c15580',
                subFilter: '5de0296ce8a23045f0c15581'
              },
              {
                filter: '5de575a65ac80a23483fece7',
                subFilter: '5de575945ac80a23483fece6'
              }
            ]
          },
          {
            quantity: 51,
            currentPrice: 460,
            filters: [
              {
                filter: '5de027f4e8a23045f0c15580',
                subFilter: '5de0296de8a23045f0c15585'
              },
              {
                filter: '5de575a65ac80a23483fece7',
                subFilter: '5de7697d535af507733c22b0'
              }
            ]
          },
          {
            quantity: 23,
            currentPrice: 1260,
            filters: [
              {
                filter: '5de027f4e8a23045f0c15580',
                subFilter: '5de0296ce8a23045f0c15582'
              },
              {
                filter: '5de575a65ac80a23483fece7',
                subFilter: '5df507faa4660f32442a0f41'
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
            data-index={'5de575945ac80a23483fece6'}
            multiple
            onChange={this.handleChangeFilterImg}
            name="userAvatar"
            type="file"
          />
        </Box>
        <Box>
          {/* {data-index храню id subfilter что бы отслеживать куда ложить файлы} */}
          <input
            data-index={'5de7697d535af507733c22b0'}
            multiple
            onChange={this.handleChangeFilterImg}
            name="userAvatar"
            type="file"
          />
        </Box>
        <Box>
          {/* {data-index храню id subfilter что бы отслеживать куда ложить файлы} */}
          <input
            data-index={'5df507faa4660f32442a0f41'}
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
