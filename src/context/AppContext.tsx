import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { AppContextProps,  Show, ShowDetails } from "../helpers/types";
import { Session } from "@supabase/supabase-js";
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
    const [episodeFile, setEpisodeFile] = useState('')
    const [token, setToken] = useState<Session | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoading, setIsLoading ] = useState(true)
    const [shows, setShows] = useState<Show[]>(initialShows)
    const [subscriptions, setSubscriptions] = useState<ShowDetails[]>([])
    const abortControllerRef = useRef<AbortController | null>(null)

    //Audio player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false); 
    // const getUserProfile = async()=>{
    //     const { data, error} = await supabase.from('profiles').select('avatar_url').eq('id', user.value.id).single()
    // }
    if(token){
        sessionStorage.setItem('token', JSON.stringify(token) )

    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            const data = JSON.parse(sessionStorage.getItem('token')!)
            
            setToken(data)
        }
        
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
        <AppContext.Provider value={{
            shows, 
            setShows, 
            episodeFile, 
            setEpisodeFile,
            isPlaying, 
            setIsPlaying,
            isMuted,
            setIsMuted,
            isLooping,
            setIsLooping, 
            subscriptions, 
            setSubscriptions,
            token, 
            setToken, 
            theme, 
            setTheme, 
            isLoading, 
            setIsLoading, 
            mobileMenuOpen, 
            setMobileMenuOpen
            }}>
            {children}
        </AppContext.Provider>
    )
}
export { useAppContext, AppContextProvider}