import { observer } from 'mobx-react-lite'
import React from 'react'

import { ScreenInfoContext } from '../App/App'
import styles from './styles.module.css';
import BarsIcon from '~/assets/icons/bars-solid.svg'

const ScreenTop = observer(() => {
    const screenInfo = React.useContext(ScreenInfoContext)

    return (
        <div className={styles.wrapper}>
            <div className={styles.bars} onClick={() => screenInfo.toggleSidebar()}>
                <BarsIcon />
            </div>
            <div className={styles.name}>{screenInfo.screenName}</div>
        </div>
    )
})
export default ScreenTop
