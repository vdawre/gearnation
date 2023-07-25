import React from 'react'
import { ACTIONS, useGlobalContext } from '../context/dataContext'
import { Box, Button, Card, CardActions, CardMedia, Stack, Typography } from '@mui/material'
import { Navbar } from '../components/'

const Profile = () => {
  const { state: { foundUser }, dispatch } = useGlobalContext()

  return (
    <>
      <Navbar />
      <Stack width='100%' justifyContent='center' alignItems='center' height='600px'>
        <Card sx={{ display:'flex', width:'340px' }}>
          <CardMedia src={foundUser.profile} alt='user-profile' width='150px' height='150px' component='img' objectFit='cover' />
          <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='flex-start' p='16px'>
            <Stack>
              <Typography component="div" variant="h5">
                {`${foundUser.firstName} ${foundUser.lastName}`}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {foundUser.email}
              </Typography>
            </Stack>
            <CardActions>
              <Button variant='contained' fullWidth={true} onClick={ () => dispatch({ type: ACTIONS.LOGOUT })}>Logout</Button>
            </CardActions>
          </Box>
        </Card>
      </Stack>
    </>
  )
}

export default Profile