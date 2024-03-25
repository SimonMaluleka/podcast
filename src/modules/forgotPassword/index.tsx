import { TextField, Button, Container } from '@mui/material'
import { supabase } from '../../auth/supabase.service'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthError } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import { FormFields } from '../../helpers/types'

const ForgotPassword = () => {
    const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    setError
    } = useForm<FormFields>()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormFields> = async (formData)=>{
        try {
            const {error} = await supabase.auth.updateUser({
                password: formData.password
            })
            if (error) {
                throw new AuthError(error.message, error.status)
            }

            navigate('/login')
        } catch (error) {
            console.log(error)
            setError("root", 
      {
        message: "Invalid login credentials"
      },
      {
        shouldFocus: true
      }
      )
        }
    }
  return (
    <Container sx={{mt:  40}} >
        <form className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit(onSubmit)}>
        <TextField label={'Enter a new password'} {...register('password')}/>
        {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
        <Button type={'submit'} disabled={isSubmitting}>{isSubmitting? "Submitting..." :"Reset Password"}</Button> 
        { errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
    </Container>
    
  )
}

export default ForgotPassword