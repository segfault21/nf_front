import React from 'react'
import ToastsStore from "../components/App/components/Toasts/store";

export const ToastsContext = React.createContext(new ToastsStore())
export const useToasts = () => React.useContext(ToastsContext)
