import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

export const API_BASE_URL = "https://podcast-api.netlify.app"
export type Show = {
    id:          string;
    title:       string;
    description: string;
    seasons:     number;
    image:       string;
    genres:      number[];
    updated:     Date;
}
type AppContextProps ={
    theme: boolean
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
    shows: Show[]
    setShows: React.Dispatch<React.SetStateAction<Show[]>>
    // genres: string[]
    // setGenres: React.Dispatch<React.SetStateAction<string[]>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    mobileMenuOpen: boolean; 
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

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
    const [isLoading, setIsLoading ] = useState(false)
    const [shows, setShows] = useState<Show[]>(initialShows)
    // const [genres, setGenres] = useState<string[]>([])
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