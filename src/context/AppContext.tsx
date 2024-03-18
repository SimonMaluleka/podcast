import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { AppContextProps, Show } from "../helpers/types";

export const API_BASE_URL = "https://podcast-api.netlify.app"

const AppContext = createContext<AppContextProps | null>(null)

const useAppContext = ()=>{
    const context = useContext(AppContext)
    if(!context){
        throw new Error("useAppContext must be used from within an AppContextProvider")
    }
    return context
}

const AppContextProvider = ({ children, initialShows }: {children: ReactNode, initialShows: Show[]})=>{
    const [theme, setTheme] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoading, setIsLoading ] = useState(true)
    const [shows, setShows] = useState<Show[]>(initialShows)
    // const [showDetails, setShowDetails] = useState<ShowDetails>()
    const abortControllerRef = useRef<AbortController | null>(null)

    useEffect(() => {
      const fetchShows = async() => {
            abortControllerRef.current?.abort()
            abortControllerRef.current = new AbortController()

            setIsLoading(true)
            try {
                const response= await fetch(`${API_BASE_URL}/shows`, {
                    signal: abortControllerRef.current.signal,
                    cache: "force-cache" 
                })
                const data = await response.json() as Show[]
                setShows(data)
            } catch (error) {
                throw new Error(`${error}`)
            } finally {
                setIsLoading(false)
            }            
        }
        fetchShows()      
    }, [])
    
    return (
        <AppContext.Provider value={{shows, setShows, theme, setTheme, isLoading, setIsLoading, mobileMenuOpen, setMobileMenuOpen}}>
            {children}
        </AppContext.Provider>
    )
}
export { useAppContext, AppContextProvider}