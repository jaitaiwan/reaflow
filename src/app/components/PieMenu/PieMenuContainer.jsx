import React from 'react'
import { connect } from 'react-redux'
import PieMenu from './PieMenu'
import {hidePie} from 'state/pie-actions'

const mapStateToPieMenuProps = (state, ownProps) => {
    return {
        x: state.pie.x,
        y: state.pie.y,
        // actions: [...state.pie.actions],
        show: state.pie.show
    }
}

@connect(mapStateToPieMenuProps, {hidePie})
class PieMenuContainer extends React.Component {
    static propTypes = {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        show: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        color: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
        spacingWidth: React.PropTypes.number,
        buttonWidth: React.PropTypes.number,
        negativeSpaceWidth: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    }

    render () {
        let {width='96px', height='96px', show, hidePie} = this.props
        let heightNum = parseInt(height)
        let widthNum = parseInt(width)
        const style = {
            'position': 'absolute',
            'top': this.props.y - (heightNum/1.3),
            'left': this.props.x - (widthNum/1.25),
            'display': (show)? 'block' : 'none'
        }
        
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout)
        }

        this.hideTimeout = setTimeout(() => {
            hidePie()
        }, 4000)

        // Wraps in a Div for positioning and display
        return <div style={style}><PieMenu {...this.props} /></div>
    }
}

export default PieMenuContainer