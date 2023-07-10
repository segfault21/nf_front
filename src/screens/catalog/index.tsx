import {observer} from "mobx-react-lite";
import {useMobx} from "../useMobx";
import {CatalogStore} from "./store";
import {useScreenName, useViewMode} from "~/utils/hooks";
import Screen from '../../components/Screen';
import styles from  './styles.module.css'
import clsx from "clsx";
import {ViewModes} from "~/types/viewModes";
import React, {useMemo} from "react";
import ListItem from "~/screens/catalog/ListItem";
import Grid from "@mui/joy/Grid";

export const ScreenContext = React.createContext(new CatalogStore())

const Catalog = observer(() => {

})

export default Catalog
