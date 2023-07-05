import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export default class Api {
    axios: AxiosInstance
    url = import.meta.env.VITE_API_URL

    constructor() {
        const options = {
            baseURL: this.url,
        }
        const interceptor = (config: AxiosRequestConfig) => {
            const token = Cookies.get('token') ?? localStorage.getItem('token')
            if (token) {
                config.headers.common['Authorization'] = token
            }
            return config
        }
        this.axios = axios.create(options)
        this.axios.interceptors.request.use(interceptor, Promise.reject)
    }

    downloadPdf(response: AxiosResponse, name: string, download = false) {
        const data = response.data
        const binaryString = window.atob(data)
        const binaryLen = binaryString.length
        const bytes = new Uint8Array(binaryLen)
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i)
            bytes[i] = ascii
        }
        const blob = new Blob([bytes], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        if (download) link.download = name
        link.click()
    }

    async downloadFile(
        response: AxiosResponse,
        name: string,
        type: string,
    ): Promise<void> {
        const respData = response.data
        const binaryString = window.atob(respData)
        const binaryLen = binaryString.length
        const bytes = new Uint8Array(binaryLen)
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i)
            bytes[i] = ascii
        }
        const blob = new Blob([bytes], { type: `application/${type}` })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        link.download = name
        link.click()
    }
}
