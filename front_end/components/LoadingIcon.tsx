import * as React from 'react'
import Box from '@material-ui/core/Box'

const LoadingIcon: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Box p={3}>
        <p>NOW LOADING !</p>
      </Box>
      <Box>
        <img src ="public/images/loadingp.gif" style={{width: "300px"}} />
      </Box>
    </Box>
  )
}

export default LoadingIcon
