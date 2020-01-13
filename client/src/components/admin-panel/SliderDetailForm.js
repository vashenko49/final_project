import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Editor } from '@tinymce/tinymce-react';

import cloudinary from 'cloudinary-core';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  },
  input: {
    display: 'none'
  },
  upload: {
    backgroundColor: theme.palette.background.paper
  },
  image: {
    maxWidth: '30%',
    objectFit: 'cover'
  },
  prodCat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  prodCatItems: {
    flexBasis: '40%'
  }
});

const SliderDetailForm = ({
  classes,
  custom,
  image,
  htmlPage,
  title,
  description,
  product,
  productsList,
  category,
  categoryList,
  onChangeValue,
  cloudinaryCloudName,
  onSubmitForm,
  onSubmitFormDisabled
}) => (
  <form autoComplete="off" className={classes.form}>
    <FormControlLabel
      control={
        <Checkbox
          checked={custom}
          onChange={e => onChangeValue('custom', e.target.checked)}
          value="checkedB"
          color="primary"
        />
      }
      label="Custom slide"
    />

    {custom ? (
      <FormControl margin="normal" fullWidth>
        <Editor
          apiKey="f4wlvhjnp35loqdyh7o17fxkgiv0p6ik4u9i51o0lv0mh5jf"
          initialValue="<p>Сreate a slide with full capabilities html editor...</p>"
          value={htmlPage}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
          }}
          onChange={e => onChangeValue('htmlPage', e.target.getContent())}
        />
      </FormControl>
    ) : (
      <>
        <FormControl margin="normal">
          <TextField
            error={!title.length}
            required
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => onChangeValue('title', e.currentTarget.value)}
          />
        </FormControl>

        <FormControl margin="normal">
          <TextField
            error={!description.length}
            required
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={e => onChangeValue('description', e.currentTarget.value)}
          />
        </FormControl>

        <FormControl margin="normal" className={classes.prodCat}>
          <Autocomplete
            id="product"
            className={classes.prodCatItems}
            value={product}
            options={productsList}
            getOptionLabel={option => option.nameProduct}
            defaultValue={product}
            onChange={(e, newValue) => onChangeValue('product', newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                required
                error={!product}
                variant="outlined"
                label="Product"
                placeholder="Enter product"
                fullWidth
              />
            )}
          />

          <Typography variant="h6">or</Typography>

          <Autocomplete
            style={{ flexBasis: '40%' }}
            id="category"
            value={category}
            groupBy={option => option.parent.name}
            options={categoryList}
            getOptionLabel={option => option.name}
            defaultValue={category}
            onChange={(e, newValue) => onChangeValue('category', newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                required
                error={!category}
                variant="outlined"
                label="Category"
                placeholder="Enter category"
                fullWidth
              />
            )}
          />
        </FormControl>
      </>
    )}

    {image && (
      <img
        className={classes.image}
        src={
          typeof image === 'object'
            ? URL.createObjectURL(image)
            : new cloudinary.Cloudinary({ cloud_name: cloudinaryCloudName }).url(image)
        }
        alt={'Not found'}
      />
    )}

    <FormControl margin="normal">
      <input
        accept="image/*"
        id="image"
        type="file"
        className={classes.input}
        onChange={e => onChangeValue('image', e.currentTarget.files[0])}
      />
      <label htmlFor="image">
        <Button
          className={classes.upload}
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload background image
        </Button>
      </label>
    </FormControl>

    <FormControl margin="normal" align="right">
      <Box>
        <Button
          disabled={onSubmitFormDisabled}
          onClick={onSubmitForm}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </FormControl>
  </form>
);

SliderDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  htmlPage: PropTypes.string.isRequired,
  custom: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  productsList: PropTypes.array.isRequired,
  categoryList: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  cloudinaryCloudName: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormDisabled: PropTypes.bool.isRequired
};

SliderDetailForm.defaultProps = {
  classes: {},
  htmlPage: '',
  custom: false,
  title: '',
  description: '',
  productsList: [],
  categoryList: [],
  cloudinaryCloudName: '',
  onChangeValue: () => {},
  onSubmitForm: () => {},
  onSubmitFormDisabled: true
};

export default withStyles(styles)(SliderDetailForm);
