import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ViewModes } from '~/types/viewModes'
import { useViewMode } from '~/utils/hooks'

import styles from './styles.module.css';

interface Props {
    className?: string
    children: React.ReactNode
}

const Screen = observer(({ className, children }: Props) => {
    const mode = useViewMode()

    return (
        <div
            className={clsx(
                styles.screenWrapper,
                mode === ViewModes.SMALL && styles.small,
                mode === ViewModes.MOBILE && styles.mobile,
                mode === ViewModes.LAPTOP && styles.laptop,
            )}
        >
            <div className={clsx(styles.screen, className)}>{children}</div>
        </div>
    )
})

export default Screen
