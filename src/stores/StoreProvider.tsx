"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { RootStore } from "./RootStore"

const StoreContext = createContext<RootStore|null>(null)
export function StoreProvider({children}:{children:ReactNode}){
    const [rootStore] = useState(()=>new RootStore())
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export function useStores(){
    const rootStore = useContext(StoreContext)
     if (rootStore === null) {
        throw new Error();
    }

    return rootStore
}