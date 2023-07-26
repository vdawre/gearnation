import { Stack, Avatar, Badge, Box, IconButton,Typography } from '@mui/material'
import { MdFavorite, MdShoppingCart } from 'react-icons/md'
import React from 'react'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/dataContext'

const Navbar = () => {
    const navigate = useNavigate()

    const { state:{ foundUser, isLoggedIn } } = useGlobalContext()

  return (
    <Box flexGrow='1' h='auto'>
        <Stack direction='row' position='static' color='primary' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}} alignItems='center' justifyContent='center'>
            <Stack direction='row' gap='16px' alignItems='center'>
                <Typography variant='h5' noWrap component="div" color='#80807D' sx={{ display:{ xs:'none', md:'flex'}}} onClick={() => navigate("/")}>
                    GearNation
                </Typography>
                <SearchBar />
            </Stack>
            <Box flexGrow="1" />
            <Box display='flex' gap='16px' mx='16px'>
                <IconButton size='medium' onClick={() => navigate("/wishlist")} >
                    <Badge badgeContent={4} size='medium' color='error'>
                        <MdFavorite />
                    </Badge>
                </IconButton>
                <IconButton size='medium' onClick={() => navigate("/cart")}>
                    <Badge badgeContent={2} size='medium' color='error'>
                        <MdShoppingCart />
                    </Badge>
                </IconButton>
            </Box >
            <IconButton size='medium' color='inherit'>
                    <Avatar src={ isLoggedIn === true ? foundUser.image : ""} alt='profile picture' sx={{ bgcolor:'gray'}} onClick={() => navigate("/profile")} />
            </IconButton>
        </Stack>
    </Box>
  )
}

export default Navbar