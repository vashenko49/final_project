import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Editor } from '@tinymce/tinymce-react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  }
});

const ProductsDetailBasicInfo = ({
  classes,
  nameProduct,
  description,
  dataCategories,
  onChangeValue,
  category,
  dataFilters,
  mainFilters,
  htmlPage
}) => {
  return (
    <form autoComplete="off" className={classes.form}>
      <FormControl margin="normal" fullWidth>
        <TextField
          error={!nameProduct}
          required
          id="nameProduct"
          label="Name"
          variant="outlined"
          value={nameProduct}
          onChange={e => onChangeValue('nameProduct', e.currentTarget.value)}
        />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <TextField
          error={!description}
          required
          multiline
          rows="5"
          id="description"
          label="Description"
          variant="outlined"
          value={description}
          onChange={e => onChangeValue('description', e.currentTarget.value)}
        />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <Editor
          apiKey="f4wlvhjnp35loqdyh7o17fxkgiv0p6ik4u9i51o0lv0mh5jf"
          initialValue="<p>Describe a more structured product</p>"
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

      <FormControl margin="normal" fullWidth>
        <Autocomplete
          id="categories"
          options={dataCategories}
          value={category}
          groupBy={option => option.parent.name}
          getOptionLabel={option => option.name}
          onChange={(e, val) => onChangeValue('category', val)}
          renderInput={params => (
            <TextField
              {...params}
              error={!category}
              variant="outlined"
              label="Categories"
              placeholder="Choose category"
              fullWidth
            />
          )}
        />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <Autocomplete
          multiple
          id="mainFilters"
          options={dataFilters}
          groupBy={option => option.parentServiceName}
          getOptionLabel={option => option.name}
          value={mainFilters}
          filterSelectedOptions
          disableCloseOnSelect
          onChange={(e, val) => onChangeValue('mainFilters', val)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={params => (
            <TextField
              required
              error={!mainFilters.length}
              {...params}
              variant="outlined"
              label="Sub filters"
              placeholder="Choose..."
              fullWidth
            />
          )}
        />
      </FormControl>
    </form>
  );
};

ProductsDetailBasicInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  nameProduct: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dataCategories: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  dataFilters: PropTypes.array.isRequired,
  mainFilters: PropTypes.array.isRequired
};

ProductsDetailBasicInfo.defaultProps = {
  classes: {},
  nameProduct: '',
  description: '',
  dataCategories: [],
  onChangeValue: () => {},
  dataFilters: [],
  mainFilters: []
};

export default withStyles(styles)(ProductsDetailBasicInfo);
