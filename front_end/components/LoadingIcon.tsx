import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

interface LoadingIconProps {
  inLoading: boolean
}

const LoadingIcon: React.FC<LoadingIconProps> = props => {
    // if (!props.inLoading) { return null }

    return (
      <React.Fragment>
        <img src ="/public/loading.gif" style={{zIndex: 999}} />
      </React.Fragment>
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
