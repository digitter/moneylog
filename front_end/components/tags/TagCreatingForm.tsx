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
import { useForm } from "react-hook-form";

const { useState } = React

type Inputs = {
  name: string,
  description: number,
};

const TagCreatingForm: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<Inputs>()
  const dispatch = useDispatch()

  const [hex, setHex] = useState<string>('#4A90E2')

  const onSubmit = data => {
    createTag(Object.assign({}, data, {color: hex}))
      .then((tag: Tag) => {
        dispatch(editTag(tagActionTypes.create, tag))
        successMessage(succesmMessages.create)
        reset()
      })
      .catch(response => {
        console.error(response)
        errorMessage(errorMessages.create)
      })
  }

  return (
    <React.Fragment>
      <div style={{height: 150, margin: '10px 10px', border: '1px solid #E8E8E9'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{background: '#263238', color: 'white', paddingLeft: '20px', borderRadius: '2px'}}>
            Create tag
          </div>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item></Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="tag name"
                name="name"
                inputRef={register}
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
                inputRef={register}
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
