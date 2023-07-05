import { runInAction } from 'mobx'
import { createContext, useContext } from 'react'
import { MobxStores } from '../types/mobxStores'

import { MobxStore, observableStore } from './useMobx'

@observableStore
class GlobalState extends MobxStore {
    _loadedStores: MobxStores = {
        batches: false,
        acceptances: false,
        itemsStorage: false,
        containers: {
            stages: false,
            logs: false,
        },
        stages: new Map(),
    }

    async initialize() {
        console.log('Hello World')
    }

    get loadedStores() {
        return this._loadedStores
    }
}

const GlobalStateContext = createContext(new GlobalState())
const GlobalStateProvider = GlobalStateContext.Provider

function useGlobalState() {
    return useContext(GlobalStateContext)
}

export { GlobalState, GlobalStateContext, GlobalStateProvider, useGlobalState }
