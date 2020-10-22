/* eslint-disable no-use-before-define */
import * as React from 'react';
import { useDispatch } from 'react-redux'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Tag from '../../models/Tag';
import { useTypedSelector } from '../../modules/Reducers';
import TagEditingModal from './TagEditingModal';
import TagCreatingForm from './TagCreatingForm';
import { deleteTag } from '../../services/TagService';
import { successMessage, succesmMessages, errorMessages, errorMessage } from '../GlobalMessage';
import { tagActionTypes, editTag } from '../../modules/TagModule';

const { useState, useEffect, useRef } = React

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    tag: {
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
      width: '90%',
      margin: '0 auto',
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
      zIndex: 1
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
    modal: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'gray'
    }
  }),
);

const TagList: React.FC = () => {
  const dispatch = useDispatch()
  const tags = useTypedSelector(state => state.tags)
  const myRef = useRef<any>()
  const classes = useStyles();

  const [value, setValue] = useState([])
  const [clickedOutside, setClickedOutside] = useState(true)
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    setValue(tags)
  }, [tags])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  })

  const handleDeleteClick = (tag: Tag) => {
    if (!window.confirm(`タグ: ${tag.name}を削除しますか?`)) {return null}

    deleteTag(tag)
      .then(() => {
        dispatch(editTag(tagActionTypes.destroy, tag))
        successMessage(succesmMessages.destroy)
      })
      .catch(() => {
        errorMessage(errorMessages.destroy)
      })
  }

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true)
    }
  }
  const handleClickInside = (option: Tag)=> {
    if (option) {setSelectedTag(option)}

    setClickedOutside(false)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        {clickedOutside
          ? <TagCreatingForm />
          : <TagEditingModal ref={myRef} tag={selectedTag} />}

        <div className={classes.popper}>
          <div className={classes.header}>Search by tag name</div>
          <Autocomplete
            open
            multiple
            classes={{
              paper: classes.paper,
              option: classes.option,
              popperDisablePortal: classes.popperDisablePortal,
            }}
            value={value}
            disableCloseOnSelect
            disablePortal
            renderTags={() => null}
            noOptionsText="No tags"
            renderOption={(option: Tag) => (
              <React.Fragment>
                <span className={classes.color} style={{ backgroundColor: option.color }} />
                <div
                  className={classes.text}
                  ref={myRef}
                  onClick={() => handleClickInside(option)}
                >
                  {option.name}<br/>
                  {option.description}
                  <Divider />
                </div>
                <div onClick={() => handleDeleteClick(option)}>
                  <DeleteForeverIcon />
                </div>
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
      </div>
    </React.Fragment>
  );
}

export default TagList
