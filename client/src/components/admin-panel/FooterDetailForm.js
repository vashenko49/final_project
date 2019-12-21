import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Editor } from '@tinymce/tinymce-react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0, 0)
  },
  heading: {
    margin: 'auto 0',
    padding: theme.spacing(0, 0, 0, 2),
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  links: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const FooterDetailForm = ({
  classes,
  groupLink,
  links,
  onChangeValue,
  onClickDelete,
  onAddLink,
  onSubmitForm,
  onSubmitFormDisabled
}) => (
  <form autoComplete="off" className={classes.form}>
    <FormControl margin="normal">
      <TextField
        error={!groupLink.length}
        required
        id="groupLink"
        label="Group link"
        variant="outlined"
        value={groupLink}
        onChange={e => onChangeValue('groupLink', e.target.value)}
      />
    </FormControl>

    <FormControl margin="normal" className={classes.root}>
      <Box mb={1}>
        <Typography align="center" className={classes.heading}>
          Links
        </Typography>
      </Box>

      {links.map(item => (
        <ExpansionPanel
          key={item.id}
          defaultExpanded={!(item.description && item.description.length)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id={item.id}
          >
            {links.length > 1 ? (
              <IconButton aria-label="delete" datakey={item.id} onClick={onClickDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            ) : null}

            <Typography className={classes.heading}>
              {item.description || 'enter link...'}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.links}>
            <FormControl margin="normal" fullWidth>
              <TextField
                error={!item.description.length}
                required
                id={`links${item.id}`}
                label="Link"
                variant="outlined"
                value={item.description ? item.description : ''}
                onChange={e => onChangeValue('description', e.target.value, item.id)}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <Editor
                apiKey="f4wlvhjnp35loqdyh7o17fxkgiv0p6ik4u9i51o0lv0mh5jf"
                initialValue="<p>Structure for footer links</p>"
                value={item.htmlPage.length ? item.htmlPage : null}
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
                onChange={e => onChangeValue('htmlPage', e.target.getContent(), item.id)}
              />
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={onAddLink}
        startIcon={<AddIcon />}
      >
        Add link
      </Button>
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

FooterDetailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  groupLink: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitFormDisabled: PropTypes.func.isRequired
};

FooterDetailForm.defaultProps = {
  classes: {},
  groupLink: '',
  links: [{ description: '', htmlPage: '' }],
  onChangeValue: () => {},
  onClickDelete: () => {},
  onAddLink: () => {},
  onSubmitForm: () => {},
  onSubmitFormDisabled: () => {}
};

export default withStyles(styles)(FooterDetailForm);
