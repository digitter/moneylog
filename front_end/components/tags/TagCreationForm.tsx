import * as React from 'react'
import TextField from '@material-ui/core/TextField';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

interface Props {}

const TagCreationForm: React.FC = (props: Props) => {
  const handleSubmit = () => {

  }

  return (
    <div style={{height: 200, width: '100%', border: '1px solid gray'}}>
      <h2>Create Tag</h2>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LocalOfferIcon/>
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="tag name" />
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
          <Grid item>
            <select></select><br/>
          </Grid>
        </Grid>

      </form>
    </div>
  )
}

export default TagCreationForm
