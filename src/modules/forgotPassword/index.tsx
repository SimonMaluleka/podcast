import { TextField, Button, Container } from '@mui/material'
import React, { useRef } from 'react'
import { supabase } from '../../auth/supabase.service'

const ForgotPassword = () => {
    const formRef = useRef()
    const handleSubmit = async()=>{
        const newPassword = new FormData(formRef.current)

        try {
            await supabase.auth.updateUser({
                password: newPassword.toString()
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Container sx={{mt:  40}} >
        <form ref={formRef} className='flex flex-col gap-4 mt-10' onSubmit={handleSubmit}>
        <TextField name={'password'} label={'Enter a new password'} />
        <Button type={'submit'}>Reset</Button> 
    </form>
    </Container>
    
  )
}

export default ForgotPassword