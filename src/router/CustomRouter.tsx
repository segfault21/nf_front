import { History } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

const CustomRouter = ({
                          basename,
                          children,
                          history,
                      }: {
    basename?: string
    children: React.ReactNode
    history: History
}) => {
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location,
    })

    React.useLayoutEffect(() => history.listen(setState), [history])

    return (
        <Router
            basename={basename}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    )
}

export default CustomRouter
