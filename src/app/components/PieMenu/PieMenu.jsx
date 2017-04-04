import React from 'react'

const CIRC = 100 // As in 0-100%
const ONE_PERCENT_CIRC = CIRC / (2*Math.PI)
const QUARTER = 4
const defaultClickAction = index => (e => {e.persist(); console.log('pieAction:',index+1, e)})
const defaultAction = {onClick: defaultClickAction}
const defaultActions = [defaultAction, defaultAction, defaultAction]

const PieMenu = ({actions=defaultActions, spacingWidth=0.3, buttonWidth=5, negativeSpaceWidth=25, color=false, width='10em', height='10em'}) => {
    // Get the dash offset for each segment
    const getSegDashOffset = (index, segLength, numSegments, distanceToDashOffset, spaceLength, separatorWidth) => {
        let segNum = (numSegments - index)
        let sepSpacing = (segNum * separatorWidth)
        return (segNum * segLength) + sepSpacing - distanceToDashOffset
    }

    // Returns an array of svg circle elements
    const getSegments = (actions, spaceLength, pieWidth, separatorWidth=0) => {
        const numSegments = actions.length
        const totalSegLength = CIRC - spaceLength
        const segLength = (totalSegLength - (separatorWidth * (numSegments +1))) / numSegments
        const spaceDashOffset = CIRC/QUARTER*3 + (spaceLength/2)
        const distanceToDashOffset = CIRC - spaceDashOffset

        return actions.map((action, i) => {
            let thisColor = color
            if (thisColor == false) {
                let cv = [
                    `0${Math.floor(Math.random() * 255).toString(16)}`.slice(-2),
                    `0${Math.floor(Math.random() * 255).toString(16)}`.slice(-2),
                    `0${Math.floor(Math.random() * 255).toString(16)}`.slice(-2) 
                ]
                thisColor = `#${cv[0]}${cv[1]}${cv[2]}`
            }

            return (<circle
                key={i}
                className={`pieSegment segment${i+1}`} 
                cx={radius} cy={radius}
                r={ONE_PERCENT_CIRC}
                fill="transparent"
                stroke={thisColor}
                strokeDashoffset={getSegDashOffset(i, segLength, numSegments, distanceToDashOffset, spaceLength, separatorWidth)}
                strokeDasharray={`${segLength} ${CIRC-segLength}`}
                strokeWidth={pieWidth}
                onClick={action.onClick(i)}
                pointerEvents="stroke"
                >
            </circle>)
        })
    }

    let radius = 20.00
    let viewBox = `0 0 ${radius*2} ${radius*2}`
    let segments = getSegments(actions, negativeSpaceWidth, buttonWidth, spacingWidth)

    return <svg style={{
        width,
        height
    }} viewBox={viewBox}>
        <circle
            className="pieBackground"
            cx={radius} cy={radius}
            r={ONE_PERCENT_CIRC}
            fill="transparent"
            stroke="transparent"
            strokeWidth={buttonWidth-0.001}
        ></circle>
        {segments}
    </svg>
}

PieMenu.propTypes = {
    actions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    spacingWidth: React.PropTypes.number,
    buttonWidth: React.PropTypes.number,
    negativeSpaceWidth: React.PropTypes.number,
    color: React.PropTypes.oneOf([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    width: React.PropTypes.number,
    height: React.PropTypes.number
}

export default PieMenu