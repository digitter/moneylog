/* eslint-disable no-use-before-define */
import * as React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import Tag from '../../models/Tag';
import { useTypedSelector } from '../../modules/Reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tag: {
      width: '50%',
      marginTop: 3,
      height: 20,
      padding: '.15em 4px',
      fontWeight: 600,
      lineHeight: '15px',
      borderRadius: 2,
    },
    popper: {
      border: '1px solid rgba(27,31,35,.15)',
      borderRadius: 3,
      width: 350,
      fontSize: 13,
      color: '#586069',
      backgroundColor: '#f6f8fa',
    },
    header: {
      borderBottom: '1px solid #e1e4e8',
      padding: '8px 10px',
      fontWeight: 600,
    },
    inputBase: {
      padding: 10,
      width: '100%',
      borderBottom: '1px solid #dfe2e5',
      '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: '1px solid #ced4da',
        fontSize: 14,
        '&:focus': {
          boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    paper: {
      boxShadow: 'none',
      margin: 0,
      color: '#586069',
      fontSize: 13,
    },
    option: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      '&[data-focus="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    popperDisablePortal: {
      position: 'relative',
    },
    color: {
      width: 14,
      height: 14,
      flexShrink: 0,
      borderRadius: 3,
      marginRight: 8,
      marginTop: 2,
    },
    text: {
      flexGrow: 1,
    },
  }),
);

const EditingTags: React.FC = () => {
  const tags = useTypedSelector(state => state.tags)

  React.useEffect(() => {
    setPendingValue(tags)
  }, [tags])

  const [pendingValue, setPendingValue] = React.useState([]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.popper}>
        <div className={classes.header}>Search</div>
        <Autocomplete
          open
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText="No tags"
          renderOption={(option: Tag) => (
            <React.Fragment>
              <span className={classes.color} style={{ backgroundColor: option.color }} />
              <div className={classes.text}>
                {option.name}
                <br />
                {option.description}
              </div>
              <div>Delete</div>
            </React.Fragment>
          )}
          options={tags}
          getOptionLabel={(option: Tag) => option.name}
          renderInput={(params) => (
            <InputBase
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              className={classes.inputBase}
            />
          )}
        />
      </div>
    </React.Fragment>
  );
}

export default EditingTags
