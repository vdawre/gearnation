import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ACTIONS, useGlobalContext } from '../context/dataContext'
import Footer from '../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { dispatch } = useGlobalContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try{
      const response = await fetch("/api/auth/login", {
        method:"POST",
        body: JSON.stringify({email: email, password: password})
      });
      const { foundUser, encodedToken } = await response.json()

      dispatch({ type: ACTIONS.LOGIN })
      dispatch({ type: ACTIONS.FOUNDUSER, payload: foundUser })

      localStorage.setItem("encodedToken", encodedToken)
      navigate(location?.state?.from?.pathname)
    } catch(error) {
      console.log(error)
    }
  }

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: "johndoe@gmail.com",
            password: "johndoe"
        }),
      });
      const { foundUser, encodedToken } = await response.json()

      dispatch({ type: ACTIONS.LOGIN });
      dispatch({type: ACTIONS.FOUNDUSER ,payload: foundUser})

      localStorage.setItem("encodedToken", encodedToken)
      navigate(location?.state?.from?.pathname)
    }catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <Box sx={{
        display:"flex",
        direction:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"96vh",
        overflow: "hidden"
      }}>
        <form>
          <Stack direction="column" gap={2} width="340px">
            <Typography variant='h2' >Login</Typography>
            <TextField
              label="Email"
              variant='outlined'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant='outlined'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button variant='contained' color='primary' onClick={handleLogin}>Log In</Button>
            <Button variant='outlined' color='primary' onClick={handleGuestLogin}>Login as guest</Button>
          </Stack>
        </form>
      </Box>
      <Footer />
    </>
  )
}

export default Login