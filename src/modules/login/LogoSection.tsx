import { Link, Typography } from "@mui/material"
import { RoutesEnum } from "../../routes"
import Logo from '../../assets/logo.png'
import { useLocation } from "react-router-dom"

function LogoSection() {
  const { pathname } = useLocation()

  return (
    <section className="flex flex-col gap-4">
        <Link  href={RoutesEnum.Home} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img src={Logo} alt="Logo" height={'20px'} width={'150px'} />
        </Link>
        { pathname == '/register' ? <Typography 
          variant="h5" 
          className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center'>
            Register for an your account
           </Typography>:
           <Typography 
          variant="h5" 
          className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center'>
            Sign in to your account
           </Typography>
        } 
       
        { pathname == '/register' ? <Typography 
          variant="body2" 
          className='mt-4 text-sm leading-6 text-gray-500'
        >
             Already a member? <Link href={RoutesEnum.Login} className='cursor-Typographyointer font-semibold text-red-600 hover:text-red-500'>Sign In</Link>
        </Typography>
        : <Typography 
          variant="body2" 
          className='mt-4 text-sm leading-6 text-gray-500'
        >
             Not a member? <Link href={RoutesEnum.Register} className='cursor-Typographyointer font-semibold text-red-600 hover:text-red-500'>Register Now</Link>
        </Typography>}
    </section>
  )

}

 

export default LogoSection