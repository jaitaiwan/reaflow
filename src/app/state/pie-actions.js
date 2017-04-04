export const PIE_CLICKED = 'pie-click'
export const HIDE_PIE = 'pie-hide'

export const clicked = (e, actions=[]) => ((dispatch) => {
    dispatch({
        x: e.clientX,
        y: e.clientY,
        actions: actions,
        type: PIE_CLICKED
    })
})

export const hidePie = () => ((dispatch) => {
    dispatch({
        type: HIDE_PIE
    })
})