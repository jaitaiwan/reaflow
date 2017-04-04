import { PIE_CLICKED, HIDE_PIE } from 'state/pie-actions'

const defaultState = {
    x: 0,
    y: 0,
    show: false,
    actions: []
}

const pie = (state=defaultState, action) => {
    switch(action.type) {
        case PIE_CLICKED:
            return {
                ...state,
                x: action.x,
                y: action.y,
                show: true,
                actions: action.actions
            }

        case HIDE_PIE:
            return {
                ...state,
                show: false
            }
    }

    return state
}

export default pie