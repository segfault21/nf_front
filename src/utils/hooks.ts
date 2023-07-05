import {ViewMode, ViewModes} from "../types/viewModes";
import {LAPTOP_MAX_WIDTH, MOBILE_MAX_WIDTH, SMALL_MAX_WIDTH} from "../constants/screenResolutions";
import React from "react";
import {Size} from "../types/size";
import {ScreenInfoContext} from "../components/App/App";

export function useWindowSize(): Size {
    const [windowSize, setWindowSize] = React.useState<Size>({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}
export function useViewMode(): ViewMode {
    const size = useWindowSize()

    if (size.width < SMALL_MAX_WIDTH) return ViewModes.SMALL
    if (size.width < MOBILE_MAX_WIDTH) return ViewModes.MOBILE
    if (size.width < LAPTOP_MAX_WIDTH) return ViewModes.LAPTOP

    return ViewModes.DESKTOP
}

export function useScreenName(name: string) {
    document.title = name
    const screenInfo = React.useContext(ScreenInfoContext)
    React.useEffect(() => {
        if (screenInfo.screenName !== name) screenInfo.setScreenName(name)
    }, [screenInfo.screenName, name])
}
