import * as React from 'react'
import TextField from '@material-ui/core/TextField';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import SketchExample from './ScketchExample';

const { useState } = React

const TagCreatingForm: React.FC = () => {
  const [tagName, setTagName] = useState<string>('')
  const [hex, setHex] = useState<string>('4A90E2')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTagName(event.currentTarget.name)
  }

  const handleSubmit = () => {}

  return (
    <div style={{height: 200, width: '90%', margin: '0 auto'}}>
      <h2>Create Tag</h2>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LocalOfferIcon/>
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
              color="primary"
              style={{width: 60}}
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default TagCreatingForm
