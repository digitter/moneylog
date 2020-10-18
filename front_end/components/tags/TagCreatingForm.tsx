import * as React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import SketchExample from './ScketchExample';
import { editTag, tagActionTypes } from '../../modules/TagModule';
import Tag from '../../models/Tag';
import { createTag } from '../../services/TagService';
import { errorMessage, errorMessages, successMessage, succesmMessages } from '../GlobalMessage';

const { useState } = React

const TagCreatingForm: React.FC = () => {
  const dispatch = useDispatch()

  const [tagName, setTagName] = useState<string>('')
  // TODO: description
  const [tagDescription, setTagDescription] = useState('sample description')
  const [hex, setHex] = useState<string>('#4A90E2')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTagName(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    createTag({name: tagName, color: hex, description: tagDescription})
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
        <div style={{background: '#2E3947', color: 'white', paddingLeft: '20px', borderRadius: '3px'}}>
          Create Tag
        </div>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="tag name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <SketchExample setHex={setHex} />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                style={{width: 60, background: '#547599', color: 'white'}}
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
