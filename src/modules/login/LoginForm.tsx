import { Button, TextField } from "@mui/material"
import { FormEvent, useRef } from "react"
import { supabase } from "../../auth/supabase.service"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

function LoginForm() {
  const { setToken } = useAppContext()
  const navigate = useNavigate()
  const formRef  = useRef()
  const handleSubmit = async (event: FormEvent)=>{
    event.preventDefault()
    const formData = new FormData(formRef.current)
    const [email, password] = formData.entries()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email[1].toString(),
        password: password[1].toString(),
      });
      if (error) throw error;
      console.log(data.session)
      setToken(data.session)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form ref={formRef} className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit}>
        <TextField name={'email'} label={'Enter your email address'} />
        <TextField name={'password'} label={'Enter your password'} type="password" />
        <a href="#" className='flex justify-end text-sm leading-6 text-red-600 hover:text-red-500'>Forgot Password?</a>
        <Button type={'submit'}>Sign In</Button> 
    </form>
  )
} 

export default LoginForm