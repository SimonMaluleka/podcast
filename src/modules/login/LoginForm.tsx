import { Button, TextField } from "@mui/material"
import { supabase } from "../../auth/supabase.service"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormFields } from "../../helpers/types"
import { AuthError } from "@supabase/supabase-js"

function LoginForm() {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new AuthError(error.message, error.status)
      }
      setToken(data.session)
      navigate("/")
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
        <TextField {...register('email')} 
        type="text" 
        label={'Enter your email address'} />
        {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
        <TextField {...register('password')} 
          type="password" 
          label={'Enter your password'} 
          />
          {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
        <a href="#" className='flex justify-end text-sm leading-6 text-red-600 hover:text-red-500'>Forgot Password?</a>
        { errors.root && <div className="text-red-500">{errors.root.message}</div>}
        <Button type={'submit'} disabled={isSubmitting}>{isSubmitting? "Submitting..." :"Sign In"}</Button> 
    </form>
  )
} 

export default LoginForm