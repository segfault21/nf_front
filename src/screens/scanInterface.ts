type ScanCallback = (data: string, next: () => void) => any

const levels = ['base', 'screen', 'modal']
type level = 'screen' | 'modal'

class ScanInterface {
    callbacks: Array<ScanCallback> = [this.baseCallback]
    navigate: ((url: string) => any) | null = null

    registerNavigate(func: (url: string) => any) {
        this.navigate = func
    }

    baseCallback(data: string) {
        if (data.startsWith('http')) {
            data = data.slice(data.indexOf('//') + 2)
            data = data.slice(data.indexOf('/'))
            if (this.navigate) this.navigate(data)
        }

        // try {
        //   const parsed = JSON.parse(data)
        //   if (parsed.type === 'container') {
        //     console.log(`Scanned container ${parsed.id}`)
        //   }
        // } catch (e) {
        //   noop()
        // }
    }

    register(level: level, cb: ScanCallback) {
        this.callbacks[levels.indexOf(level)] = cb
    }

    unregister(level: string, cb: ScanCallback) {
        if (this.callbacks[levels.indexOf(level)] !== cb) return
        delete this.callbacks[levels.indexOf(level)]
    }

    trigger(data: string) {
        this.run(data, this.callbacks.length - 1)
    }

    run(data: string, i: number): void {
        if (i < 0) return
        if (!this.callbacks[i]) return this.run(data, i - 1)
        this.callbacks[i].apply(this, [
            data,
            () => {
                this.run(data, i - 1)
            },
        ])
        return
    }
}

const scanInterface = new ScanInterface()
export default scanInterface

window.processScanData = (data: string) => {
    scanInterface.trigger(data)
}
