import { Button, TextField } from "@mui/material"

function LoginForm() {
  return (
    <form className='flex flex-col gap-4 mt-10'>
        <TextField name={'email'} label={'Enter your email address'} />
        <TextField name={'password'} label={'Enter your password'} />
        <a href="#" className='flex justify-end text-sm leading-6 text-red-600 hover:text-red-500'>Forgot Password?</a>
        <Button type={'submit'}>Sign In</Button> 

    </form>

  )

}

 

export default LoginForm