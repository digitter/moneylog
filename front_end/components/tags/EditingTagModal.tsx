import * as React from "react";
import { useDispatch } from 'react-redux'
import Tag from "../../models/Tag";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import SketchExample from "./ScketchExample";
import { updateTag } from "../../services/TagService";
import { successMessage, succesmMessages, errorMessage, errorMessages } from "../GlobalMessage";
import { editTag, tagActionTypes } from "../../modules/TagModule";

const { useState } = React

interface Props {
  tag: Tag
}

const EditingTagModal = React.forwardRef((props: Props, ref: any) => {
  const dispatch = useDispatch()

  const [tagName, setTagName] = useState<string>(props.tag.name)
  // TODO: description
  const [description, setDescription] = useState(props.tag.description)
  const [hex, setHex] = useState<string>(props.tag.color)

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    updateTag({ id: props.tag.id, name: tagName, color: hex, description: description })
      .then((tag: Tag) => {
        dispatch(editTag(tagActionTypes.update, tag))
        successMessage(succesmMessages.update)
      })
      .catch(() => {
        errorMessage(errorMessages.update)
      })
  }

  return (
    <React.Fragment>
      <Paper elevation={2} ref={ref} style={{height: 150, margin: '10px 10px'}}>
        <div style={{background: '#2E3947', color: 'white', paddingLeft: '20px', borderRadius: '3px'}}>
          Edit Tag
        </div>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="tag name"
                defaultValue={props.tag.name}
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <SketchExample setHex={setHex} editingTag={props.tag} />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                style={{width: 60, background: '#0F7C3F', color: 'white'}}
              >
                EDIT
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="tag description"
                name="description"
                defaultValue={props.tag.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
});

export default EditingTagModal
