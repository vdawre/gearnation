import React, { useEffect } from 'react'
import { Navbar } from '../components'
import { Stack, Typography, } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/dataContext'

const OrderSummary = () => {
  const navigate = useNavigate()

  const { deliveryAddress, cartData, setCartData ,setDeliveryAddress} = useGlobalContext();
  
  const emptyUserCart = () => {
    const productsId = cartData.map((product)=>product._id);
    const encodedToken = localStorage.getItem("encodedToken");
    productsId.forEach(async (Id) => {
        const response = await fetch(`/api/user/cart/${Id}`, {
            method: "DELETE",
            headers: {
                authorization: encodedToken,
            }
        });
        const { cart } = await response.json();
        setCartData(cart)
        setDeliveryAddress([])
    })
  }
  
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
      emptyUserCart()
    }, 16000)
  })

  return (
    <>
      <Navbar />
      <Stack width='100%' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}} >
        <Typography variant='h4' gutterBottom>Order Summary</Typography>
        <Typography variant='subtitle1' marginBottom='32px'>You will be redirected shortly.....</Typography>
        <Stack border='1px solid black' borderRadius='8px' px='16px' py='16px' width='400px'>
          <Typography variant='h6' color='primary.main' marginBottom='12px'>Order Confirmed</Typography>
          <Typography variant='subtitle1' fontWeight='500'>Payment Mode: Pay on delivery</Typography>
          <Typography variant='subtitle2' fontWeight='400' marginBottom='12px'>Pay on delivery</Typography>
          <Typography variant='subtitle1' fontWeight='500'>Total Price:</Typography>
          <Typography variant='subtitle2' fontWeight='400' marginBottom='12px'> ₹ {cartData.reduce((acc, { price, qty }) => acc += price * qty, 0)}</Typography>
          <Typography variant='subtitle1' fontWeight='500'>Order will be delivered to: </Typography>
          <Typography variant='subtitle2' fontWeight='400' marginBottom='12px'>{deliveryAddress.name}, Pincode: {deliveryAddress.pincode}, {deliveryAddress.city}, {deliveryAddress.state}</Typography>
          <Typography variant='subtitle1' fontWeight='500'>Items Ordered: </Typography>
          {
            cartData.map((product) => <Typography variant='subtitle2' fontWeight='400' marginBottom='12px'>{product.title} X{product.qty} for ${product.price * product.qty}</Typography>)
          }
        </Stack>
      </Stack>
    </>
  )
}

export default OrderSummary