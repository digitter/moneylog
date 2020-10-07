import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'

interface LoadingIconProps {
  inLoading: boolean
}

const LoadingIcon: React.FC<LoadingIconProps> = props => {
    // if (!props.inLoading) { return null }

    return (
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Box p={1}>
        </Box>
        <Box p={1}>
        </Box>
        <Box p={1}>
        </Box>
        <Box>
          <p>NOW LOADING ...</p>
        </Box>
        <Box>
          <img src ="/public/loading.gif" style={{width: "200px"}} />
        </Box>
      </Box>
    )
}

const mapStateToProps = state => {
  return {
    inLoading: state.common.inLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingIcon)
