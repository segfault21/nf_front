import React from 'react';
import './styles.module.css';
import {observer} from "mobx-react-lite";
import {useMobx} from "~/screens/useMobx";
import {GlobalState, GlobalStateProvider} from "~/screens/globalState";
import { Route, Routes } from 'react-router-dom';
import {useViewMode} from "~/utils/hooks";
import {makeAutoObservable} from "mobx";
import {ViewModes} from "~/types/viewModes";
import ScreenTop from "../ScreenTop";
import {inspect} from "util";
import Catalog from "../../screens/catalog";
import ToastsStore from "./components/Toasts/store";
import {ToastsContext} from "~/contexts/toasts";
import CustomRouter from "../../router/CustomRouter";
import history from "../../router/history";
import styles from './styles.module.css'
import scanInterface from "../../screens/scanInterface";
import Toasts from "./components/Toasts";

export class ScreenInfoStore {
    screenName = 'Screen Name'
    sidebarShown = false

    constructor() {
        makeAutoObservable(this)
    }

    setScreenName(name: string) {
        this.screenName = name
    }

    toggleSidebar() {
        this.sidebarShown = !this.sidebarShown
    }

    hideSidebar() {
        this.sidebarShown = false
    }

    showSidebar() {
        this.sidebarShown = true
    }
}

export const ScreenInfoContext = React.createContext(new ScreenInfoStore())

const ServiceComponent = () => {
    React.useEffect(() => {
        scanInterface.registerNavigate((url) => history.push(url))
    }, [history, scanInterface])

    return <></>
}

const Index = observer(() => {
    const globalState = useMobx(new GlobalState())
    const mode = useViewMode()
    const [screenInfo] = React.useState(new ScreenInfoStore())
    const [toasts] = React.useState(new ToastsStore())

    return (
        <ScreenInfoContext.Provider value={screenInfo}>
            <GlobalStateProvider value={globalState}>
                <ToastsContext.Provider value={toasts}>
                    <CustomRouter history={history}>
                        <div className={styles.app} id="app">
                            {(mode === ViewModes.MOBILE || mode === ViewModes.SMALL) && (
                                <ScreenTop />
                            )}
                            <ServiceComponent />
                            <Routes>
                                <Route path="/" element={<Catalog />} />
                            </Routes>
                        </div>
                        <Toasts />
                    </CustomRouter>
                </ToastsContext.Provider>
            </GlobalStateProvider>
        </ScreenInfoContext.Provider>
    )
})

export default Index
