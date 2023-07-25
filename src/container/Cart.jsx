import React from 'react'
import { useGlobalContext } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { CartItemCard, Navbar } from '../components'

const Cart = () => {
  const navigate = useNavigate()

  const { cartData } = useGlobalContext()

  return (
    <>
      <Navbar />
      <Stack direction='row' width='100%'>
        <Stack width='60%' mx="2.5%" sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}}>
          <Typography variant='h4' fontWeight='400'>Cart Items</Typography>
          {
            cartData.length === 0 && <Typography variant='subtitle1' color='text.secondary'>Add some items to cart</Typography>
          }
          {
            cartData.map((product) => <CartItemCard data={product} key={product._id} /> )
          }
        </Stack>
        <Stack width='30%' mx="2.5%">
          
        </Stack>
    </Stack>
    </>
  )
}

export default Cart