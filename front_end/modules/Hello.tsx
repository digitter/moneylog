import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoadingIcon from '../components/LoadingIcon'
import { setInLoading } from '../modules/CommonModule'

interface HelloProps {
  setInLoading: typeof setInLoading
}

interface HelloState {

}

class Hello extends React.Component<HelloProps, HelloState> {
  setLoading = () => {
    this.props.setInLoading(true)
  }

  unsetLoading = () => {
    this.props.setInLoading(false)
  }

  render() {
    return (
      <React.Fragment>
        <h2>Hello boilerplate</h2>
        <img src ="/public/hello.png" style={{width: 200, height: 200}} />

        <p><button onClick={this.setLoading}>start loading</button></p>
        <p><button onClick={this.unsetLoading}>stop loading</button></p>
        <LoadingIcon />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setInLoading: setInLoading,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
