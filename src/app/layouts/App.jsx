import React from 'react'
import { connect } from 'react-redux'
import PieMenu from 'components/PieMenu'
import _ from 'reset-css/reset.css'
import styleVariables from 'components/variables.sass'
import * as actions from 'state/pie-actions'

const AppLayout = ({clicked}) => {
    const onClick = e => {
        clicked(e, [{name: 'Add Component'}, {name: 'Go Up Level'}, {name: 'Open Tree'}])
    }

    const onDoubleClick = e => {

    }

    const onDrag = e => {

    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: styleVariables.dark
            }}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onDrag={onDrag}>
        <PieMenu color={styleVariables.primary} />
        </div>
    )
}

export default connect(null, actions)(AppLayout)
