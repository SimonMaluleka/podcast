import { TextField, Button } from '@mui/material'
import { AuthError } from '@supabase/supabase-js'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../auth/supabase.service'
import { useAppContext } from '../../context/AppContext'
import { FormFields } from '../../helpers/types'

const RegistrationForm = () => {
  const { setToken } = useAppContext()
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    setError
   } = useForm<FormFields>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormFields> = async (formData)=>{
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: 'http://localhost:5173/login',
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (error) {
        throw new AuthError(error.message, error.status)
      }
      setToken(data.session)
      navigate("/login")
    } catch (err: unknown) {
      console.log(err)
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
    <form className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('firstName')} 
        type="text" 
        label={'Enter your first name'} />
        {errors.firstName && (<div className="text-red-500">{errors.firstName.message}</div>)}
        <TextField {...register('lastName')} 
        type="text" 
        label={'Enter your last name'} />
        {errors.lastName && (<div className="text-red-500">{errors.lastName.message}</div>)}
        <TextField {...register('email')} 
        type="text" 
        label={'Enter your email address'} />
        {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
        <TextField {...register('password')} 
          type="password" 
          label={'Enter your password'} 
          />
          {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
        { errors.root && <div className="text-red-500">{errors.root.message}</div>}
        <Button type={'submit'} disabled={isSubmitting}>{isSubmitting? "Submitting..." :"Register"}</Button> 
    </form>
  )
}

export default RegistrationForm