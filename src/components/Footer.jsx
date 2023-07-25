import { Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <footer>
        <Stack direction="row" justifyContent="center">
        <Typography variant='subtitle2' textAlign="center">
            Made by "
        </Typography>
        <Typography variant='subtitle2' textAlign="center" color="primary">
            Vaibhav Dawre"
        </Typography>
        </Stack>
    </footer>
  )
}

export default Footer