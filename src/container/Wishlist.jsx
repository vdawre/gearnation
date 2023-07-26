import React from 'react'
import { Navbar } from '../components'
import { Box, Stack, Typography } from '@mui/material'
import { useGlobalContext } from '../context/dataContext'
import WishlistItemCard from '../components/WishlistItemCard'

const Wishlist = () => {
  const { wishlistData } = useGlobalContext()

  return (
    <>
      <Navbar />
      <Stack width='100%' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}} >
        <Stack width='100%' sx={{ justifyContent:{ xs:'center', md:'flex-start'}}} >
            <Box>
              <Typography variant='h4' fontWeight='400'>Your Wishlist</Typography>
              {
                wishlistData.length === 0 && <Typography variant='subtitle1' color='text.secondary'>Add some items to wishlist</Typography>
              }
            </Box>
            <Box display='flex' direction='row' flexWrap='wrap' sx={{ justifyContent:{ xs:'center', md:'flex-start'}, my:'24px' }}>
              {
                wishlistData.map((product) => <WishlistItemCard data={product} key={product._id} /> )
              }
            </Box>
          </Stack>
      </Stack>
    </>
  )
}

export default Wishlist