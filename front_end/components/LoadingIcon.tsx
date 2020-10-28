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
        <Box p={3}>
          <p>NOW LOADING ! Getting logs...</p>
        </Box>
        <Box>
          <img src ="/public/loadingp.gif" style={{width: "300px"}} />
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
