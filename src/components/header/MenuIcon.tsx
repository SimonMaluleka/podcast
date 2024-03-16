import { Bars3Icon } from "@heroicons/react/16/solid"
import { Button } from "@mui/material"
import { useAppContext } from "../../context/AppContext"

type MobileMenuProps = {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuIcon= ({setMobileMenuOpen}: MobileMenuProps)=>{
    const { mobileMenuOpen } = useAppContext()    
    return (
        <div className="flex lg:hidden justify-center items-center w-full">
            <Button onClick={()=>{ setMobileMenuOpen(true); console.log(mobileMenuOpen)}} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <span className="sr-only" hidden>Open main menu</span>
                <Bars3Icon className={`h-6 w-12 text-[#ffc965]`} aria-hidden="true" />
            </Button>
        </div>
    )
} 