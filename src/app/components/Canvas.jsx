import React from 'react'
import { connect } from 'react-redux'
import variables from 'components/variables.sass'

class Canvas extends React.Component {

    setReference (element) {
        this.reference = element
    }

    onClick = e => {

    }

    onDblClick = e => {

    }

    onDrag = e => {

    }

    render () {
        return (
            <canvas onClick={this.onClick} onDoubleClick={this.onDblClick} onDrag={this.onDrag} ref={this.setRef} style={{
            width: '100%',
            height: '100%',
            backgroundColor: variables.dark
            }}></canvas>
        )
    }
}

Canvas.propTypes = {
    dispatch: React.PropTypes.func.isRequired
}

export default connect()(Canvas)
