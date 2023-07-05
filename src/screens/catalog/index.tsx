import {observer} from "mobx-react-lite";
import {useMobx} from "../useMobx";
import {CatalogStore} from "./store";
import {useScreenName, useViewMode} from "~/utils/hooks";
import Screen from '../../components/Screen';
import styles from  './styles.module.css'
import VirtualList from "@nikifilini/react-virtual-list";
import clsx from "clsx";
import {ViewModes} from "~/types/viewModes";
import React, {useMemo} from "react";
import ListItem from "~/screens/catalog/ListItem";
import { Product } from "~/api/catalog/products";
import Grid from "@mui/joy/Grid";

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
                <Grid container spacing={5}>
                    {cachedList.map((value) => (
                        <Grid key={value.id} item='true'>
                            <ListItem item={value}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </ScreenContext.Provider>
    )
})

export default Catalog
