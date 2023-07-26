import React from 'react'
import { useGlobalContext } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { CartItemCard, Navbar } from '../components'

const Cart = () => {
  const navigate = useNavigate()

  const { cartData } = useGlobalContext()

  return (
    <>
      <Navbar />
      <Stack direction='row' width='100%' flexWrap='wrap' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}}>
        <Stack width='100%' sx={{ justifyContent:{ xs:'center', md:'flex-start'}}} >
          <Box>
            <Typography variant='h4' fontWeight='400'>Cart Items</Typography>
            {
              cartData.length === 0 && <Typography variant='subtitle1' color='text.secondary'>Add some items to cart</Typography>
            }
          </Box>
          <Box display='flex' direction='row' flexWrap='wrap' sx={{ justifyContent:{ xs:'center', md:'flex-start'}, my:'24px' }}>
            {
              cartData.map((product) => <CartItemCard data={product} key={product._id} /> )
            }
          </Box>
        </Stack>
        <Stack width='100%'>
          <Typography variant='h4' fontWeight='400'>Cart Summary</Typography>
          <Typography variant='subtitle1' color='text.secondary' my='12px'>
            Total Price: ${ cartData.reduce((acc, { price, qty }) => acc += price * qty, 0) }
          </Typography>
          <Box my='12px'>
            <Button value="" onClick={() => {
              if(cartData.length !== 0){
                navigate("/checkout");
              }
              else{
                  alert("Add some items to cart");
              }
            }} variant='contained' >Checkout</Button>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default Cart