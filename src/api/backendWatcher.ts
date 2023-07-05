import { EventEmitter2 } from 'eventemitter2'

class BackendWatcher {
    private readonly emitter: EventEmitter2
    // eslint-disable-line
    private ws: WebSocket | undefined

    constructor() {
        this.emitter = new EventEmitter2({ wildcard: true, delimiter: '#' })
        this.connectSocket()
    }

    trigger(event: 'update' | 'create', entity: string, id: string) {
        if (event === 'update') {
            this.emitter.emit(`${event}#${entity}#${id}`, id)
        } else {
            this.emitter.emit(`${event}#${entity}`, id)
        }
    }

    listenUpdates(
        entity: string,
        id: string | null,
        callback: (id: string) => void,
    ) {
        if (id) {
            this.emitter.addListener(`update#${entity}#${id}`, callback)
            return () =>
                this.emitter.removeListener(`update#${entity}#${id}`, callback)
        } else {
            this.emitter.addListener(`update#${entity}#*`, callback)
            return () => this.emitter.removeListener(`update#${entity}#*`, callback)
        }
    }

    removeUpdatesListener(
        entity: string,
        id: string | null,
        callback: (id: string) => void,
    ) {
        if (id) {
            this.emitter.off(`update#${entity}#${id}`, callback)
        } else {
            this.emitter.off(`update#${entity}#*`, callback)
        }
    }

    listenCreate(entity: string, callback: (id: string) => void) {
        this.emitter.addListener(`create#${entity}`, callback)
    }

    removeCreateListener(entity: string, callback: (id: string) => void) {
        this.emitter.off(`create#${entity}`, callback)
    }

    private connectSocket() {
        const ws = new WebSocket(import.meta.env.VITE_WS_URL)
        ws.onmessage = (e) => {
            const [, event, entity, id] = e.data.match(/(.+)\.(.+)#(.+)/)
            backendWatcher.trigger(event as 'update' | 'create', entity, id)
        }

        ws.onclose = () => {
            setTimeout(() => this.connectSocket(), 1000)
        }
        this.ws = ws
    }
}

const backendWatcher = new BackendWatcher()
export default backendWatcher
