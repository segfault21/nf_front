import {observer} from "mobx-react-lite";
import {useMobx} from "../useMobx";
import {CatalogStore} from "./store";
import {useScreenName, useViewMode} from "~/utils/hooks";
import Screen from '../../components/Screen';
import styles from './styles.module.css'
import VirtualList from "@nikifilini/react-virtual-list";
import clsx from "clsx";
import {ViewModes} from "~/types/viewModes";
import React, {useMemo} from "react";
import ListItem from "~/screens/catalog/ListItem";

export const ScreenContext = React.createContext(new CatalogStore())

const Catalog = observer(() => {
    const state = useMobx(new CatalogStore())
    const mode = useViewMode()
    useScreenName('Каталог')

    const cachedList = useMemo(
        () => state.info(),
        [
            JSON.stringify(state.data),
        ],
    )

    if (!state.data) {
        return (
            <Screen>{null}</Screen>
        )
    }
    return (
        <ScreenContext.Provider value={state}>
            <div
                className={clsx(
                    styles.screenWrapper,
                    mode === ViewModes.SMALL && styles.small,
                    mode === ViewModes.MOBILE && styles.mobile,
                    mode === ViewModes.LAPTOP && styles.laptop,
                )}
            >
                <div styleName="screenScroll">
                    <div className={styles.screen}>
                        <div className={styles.head}>
                            <span className={styles.name}>Название</span>
                            <span className={styles.article}>Артикул</span>
                        </div>
                        <VirtualList
                            items={cachedList}
                            itemBuffer={10}
                            itemHeight={48}
                        >
                            {({ virtual }, scrollableRef, ref) => (
                                <div ref={scrollableRef} className={styles.itemsWrapper}>
                                    {state.loading && (
                                        <span className="p-3 italic text-gray-500 block">
                                            Загружаем список...
                                        </span>
                                    )}
                                    {!cachedList.length && !state.loading && (
                                        <span className="p-3 italic text-gray-500 block">
                                            Нет товаров
                                        </span>
                                    )}
                                    <div
                                        style={{
                                            ...virtual.style,
                                            minHeight: virtual.style.height,
                                        }}
                                        ref={ref}
                                    >
                                        <div className={styles.items}>
                                            {virtual.items.map((productInfo) => (
                                                <ListItem
                                                    item={productInfo}
                                                    key={productInfo.id}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </VirtualList>
                    </div>
                </div>
            </div>
        </ScreenContext.Provider>
    )
})

export default Catalog
