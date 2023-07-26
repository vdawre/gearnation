import React, { useState } from 'react'
import { Navbar } from '../components'
import { Box, Button, Checkbox, Divider, FormControlLabel, Stack, Typography } from '@mui/material'
import { useGlobalContext } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()

  const { addresses, deliveryAddress, setDeliveryAddress, cartData } = useGlobalContext()

  const [ isChecked, setIsChecked ] = useState(false)

  const handleCheckbox = (event) => {
    setIsChecked(event.target.checked)
    if (event.target.checked === true) {
      setDeliveryAddress(addresses[event.target.value])
    }
  }

  const handlePlaceOrder = () => {
    if (Object.keys(deliveryAddress).length > 0) {
      navigate("/order_summary")
    } else{
      alert("Address Not Selected")
    }
  }

  return (
    <>
      <Navbar />
      <Stack width='100%' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}} >
        <Box marginBottom='32px'>
          <Typography variant='h4'>Your Address</Typography>
          {
            addresses.length < 1 
            && 
            <Box>
              <Typography variant='subtitle1' my='8px'>No address found to add new address </Typography>
              <Button variant='outlined' my='12px' onClick={() => navigate("/profile")} >Click here</Button>
            </Box>
          }
          {
            addresses.map((address, index) => <Box key={index}>
              <FormControlLabel label={<Typography variant='subtitle1'>{address.name}, Pincode: {address.pincode}, {address.city}, {address.state}</Typography>} control={<Checkbox checked={isChecked} onChange={handleCheckbox} value={index} />} />
            </Box>)
          }
        </Box>
        <Stack gap='12px'>
          <Typography variant='h4'>Order Summary</Typography>
          {
            cartData.map((product) => <Typography variant='subtitle1' >{product.title} X{product.qty}</Typography> )
          }
          <Divider width="400px"/>
          <Typography variant='subtitle1' fontWeight='500'>Total Price: ${
            cartData.reduce((acc, {price, qty}) => acc += price * qty, 0)
          }
          </Typography>
          <Box>
            <Button variant='contained' onClick={handlePlaceOrder}>Place Order</Button>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default Checkout