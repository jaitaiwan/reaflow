const MOUSE_MOVED = 'global-mouse-move'

const mouseMoved = e => ({
    type: MOUSE_MOVED,
    event: e
})

export const listenMouseMove = dispatch => {
    function handleEvent(e) {
        dispatch(mouseMoved(e))
    }

    window.addEventListener('mousemove', handleEvent)

    return () => window.removeEventListener('mousemove', handleEvent)
}