import { makeAutoObservable } from 'mobx'
import { v4 } from 'uuid'
import {ToastType, ToatsTypes} from "../../../../types/toasts";

export class Toast {
    private timer: NodeJS.Timeout | undefined
    public id: string

    constructor(
        public message: string,
        public type: ToastType,
        private close: (toast: Toast) => void,
        public duration: number = 5000,
        public moveToId: string,
    ) {
        this.id = v4()
        this.start()
    }

    start() {
        this.timer = setTimeout(() => this.close(this), this.duration)
    }

    forceClose() {
        clearTimeout(this.timer)
        this.close(this)
    }
}

export default class ToastsStore {
    toasts: Toast[] = []
    disabled = false

    constructor() {
        makeAutoObservable(this)
    }

    setDisabled(value: boolean) {
        this.disabled = value
    }

    toast(type: ToastType, message: string, moveToId = '') {
        if (this.disabled && type !== ToatsTypes.ERROR) {
            return
        }
        const duration = type === ToatsTypes.MOVE ? 12000 : 5000
        this.toasts.push(
            new Toast(message, type, (t) => this.removeToast(t), duration, moveToId),
        )
    }

    info(message: string) {
        this.toast(ToatsTypes.INFO, message)
    }

    error(message: string) {
        this.toast(ToatsTypes.ERROR, message)
    }

    success(message: string) {
        this.toast(ToatsTypes.SUCCESS, message)
    }

    move(moveToId: string, message: string) {
        this.toast(ToatsTypes.MOVE, message, moveToId)
    }

    removeToast(toast: Toast) {
        const index = this.toasts.indexOf(toast)
        if (index < 0) return
        this.toasts.splice(index, 1)
    }

    removeToastById(id: string) {
        const index = this.toasts.findIndex((t) => t.id === id)
        if (index < 0) return
        this.toasts.splice(index, 1)
    }
}
