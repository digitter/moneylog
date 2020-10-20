import * as React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import SketchExample from './common/ScketchExample';
import { editTag, tagActionTypes } from '../../modules/TagModule';
import Tag from '../../models/Tag';
import { createTag } from '../../services/TagService';
import { errorMessage, errorMessages, successMessage, succesmMessages } from '../GlobalMessage';

const { useState } = React

const TagCreatingForm: React.FC = () => {
  const dispatch = useDispatch()

  const [tagName, setTagName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [hex, setHex] = useState<string>('#4A90E2')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    switch (event.currentTarget.name) {
      case 'name':
        setTagName(event.currentTarget.value)
        break;
      case 'description':
        setDescription(event.currentTarget.value)
        break;
      default: return null;
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    createTag({name: tagName, color: hex, description: description})
      .then((tag: Tag) => {
        dispatch(editTag(tagActionTypes.create, tag))
        successMessage(succesmMessages.create)
      })
      .catch(response => {
        console.error(response)
        errorMessage(errorMessages.create)
      })
  }

  return (
    <React.Fragment>
      <div style={{height: 150, margin: '10px 10px', border: '1px solid #E8E8E9'}}>
        <form onSubmit={handleSubmit}>
          <div style={{background: '#547599', color: 'white', paddingLeft: '20px', borderRadius: '2px'}}>
            Create tag
          </div>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item></Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="tag name"
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <SketchExample setHex={setHex} />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="flex-end">
            <Grid item ></Grid>
            <Grid item style={{flexGrow: 3.0}}>
              <TextField
                style={{width: '90%'}}
                id="input-with-icon-grid"
                label="description"
                name="description"
                onChange={handleChange}
              />
            </Grid>
            <Grid item style={{flexGrow: 1.0}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                style={{width: 60, background: '#547599', color: 'white', fontSize: 10}}
              >
                CREATE
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </React.Fragment>
  )
}

export default TagCreatingForm
