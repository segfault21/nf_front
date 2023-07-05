import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'

import { Toast } from './store'
import styles from './styles.module.css'

export const Error = observer(({ toast }: { toast: Toast }) => {
    return (
        <div className={classNames(styles.toast, styles.error)}>
            {toast.message}
        </div>
    )
})

export const Info = observer(({ toast }: { toast: Toast }) => {
    return <div className={styles.toast}>{toast.message}</div>
})

export const Success = observer(({ toast }: { toast: Toast }) => {
    return (
        <div className={classNames(styles.toast, styles.success)}>
            {toast.message}
        </div>
    )
})

export const Move = observer(({ toast }: { toast: Toast }) => {
    return (
        <div className={classNames(styles.toast, styles.success)}>
            <Link to={`/documents/${toast.moveToId}`}>{toast.message}</Link>
        </div>
    )
})
