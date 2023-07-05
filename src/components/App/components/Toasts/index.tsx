import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Info, Error, Success, Move } from './toast-types'
import {useToasts} from "../../../../contexts/toasts";
import {useViewMode} from "../../../../utils/hooks";
import {ViewModes} from "../../../../types/viewModes";
import {ToatsTypes} from "../../../../types/toasts";
import styles from './styles.module.css'

const Toasts = observer(() => {
    const state = useToasts()
    const mode = useViewMode()

    return (
        <div className={styles.wrapper}>
            <div
                className={classNames(
                    styles.toasts,
                    mode === ViewModes.MOBILE && styles.mobile,
                    mode === ViewModes.SMALL && styles.small,
                )}
            >
                {state.toasts.map((t) => {
                    if (t.type === ToatsTypes.INFO) return <Info toast={t} key={t.id} />
                    if (t.type === ToatsTypes.ERROR) return <Error toast={t} key={t.id} />
                    if (t.type === ToatsTypes.SUCCESS)
                        return <Success toast={t} key={t.id} />
                    if (t.type === ToatsTypes.MOVE) return <Move toast={t} key={t.id} />
                    return <React.Fragment key={t.id} />
                })}
            </div>
        </div>
    )
})

export default Toasts
