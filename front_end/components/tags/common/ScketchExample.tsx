'use strict'

import * as React from 'react'
import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'
import Tag from '../../../models/Tag';

interface Props {
  setHex: any
  editingTag?: Tag
}

interface State {}

class SketchExample extends React.Component<Props, State> {
  state = {
    displayColorPicker: false,
    hex: '#4A90E2'
  };

  componentDidMount() {
    if (this.props.editingTag) {
      this.setState({hex: this.props.editingTag.color})
    }
  }

  handleClick = async() => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ hex: color.hex })
    this.props.setHex(color.hex)
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          backgroundColor: `${this.state.hex}`
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          left: '100px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CompactPicker color={this.state.hex} onChange={this.handleChange} />
        </div> : null }

      </div>
    )
  }
}

export default SketchExample
