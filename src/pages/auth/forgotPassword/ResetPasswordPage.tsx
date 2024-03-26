import { Box } from '@mui/system'
import ForgotPasswordForm from '../../../modules/forgotPassword'
import LogoSection from '../../../modules/login/LogoSection'

const ResetPasswordPage = () => {
  return (
    <Box sx={{display:"flex", flex: 1, minHeight: "100vh"}}>
      {/* Left hand column*/}
      <Box 
        sx={{
          display:"flex", 
          flexDirection:"column", 
          flex: 1, 
          width:"33%", 
          justifyContent:"center", 
          paddingX: {xs: 4, md: 6}, 
          paddingY:{xs: 16, xl:24 }, 
          lg: {flex:'none'}
          }}>
            <Box 
              sx={{margin:"0 auto", width:"100%", maxWidth:"384px", lg:{width:"384px"}}}
            >
              <LogoSection />
              <ForgotPasswordForm />
            </Box>
      </Box>
      <Box>
        
      </Box>
    </Box>
  )
}

export default ResetPasswordPage