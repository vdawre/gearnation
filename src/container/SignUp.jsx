import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ACTIONS, useGlobalContext } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const { dispatch } = useGlobalContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleSignUp = async () => {
    try{
      const response = await fetch("/api/auth/signup", {
        method:"POST",
        body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })
      });
      const { createdUser, encodedToken } = await response.json()

      dispatch({ type: ACTIONS.LOGIN })
      dispatch({ type: ACTIONS.FOUNDUSER, payload: createdUser })

      localStorage.setItem("encodedToken", encodedToken)
      navigate("/store")
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <Box sx={{
      display:"flex",
      direction:"column",
      justifyContent:"center",
      alignItems:"center",
      height:"98vh",
    }}>
      <form>
        <Stack direction="column" gap={2} width="340px">
          <Typography variant='h2' >Sign Up</Typography>
          <TextField
            label="First Name"
            variant='outlined'
            type='text'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant='outlined'
            type='text'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
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
          <Button variant='contained' color='primary' onClick={handleSignUp}>Create Account</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default SignUp