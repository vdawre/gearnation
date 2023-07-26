import React from 'react'
import { useGlobalContext } from '../context/dataContext'
import { Button, Stack, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material'

const CartItemCard = ({ data }) => {
  const { title, price, image } = data

  const { setCartData } = useGlobalContext()
  const encodedToken = localStorage.getItem("encodedToken")

  const handleDeleteItem = async (event) => {
    const productId = event.target.value
    const response = await fetch(`/api/user/cart/${productId}`, {
        method: "POST",
        headers: {
            authorization: encodedToken,
        },
        body: JSON.stringify({ action: { type: "increment" } }),
    });
    const { cart } = await response.json()
    setCartData(cart)
  }

  const handleDecreaseQty = async (event) => {
    const productId = event.target.value
    const response = await fetch(`/api/user/cart/${productId}`, {
        method: "POST",
        headers: {
            authorization: encodedToken,
        },
        body: JSON.stringify({ action: { type: "decrement" } }),
    });
    const { cart } = await response.json()
    setCartData(cart)
  }

  const handleIncreaseQty = async (event) => {
    const productId = event.target.value
    const response = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: {
            authorization: encodedToken,
        }
    });
    const { cart } = await response.json()
    setCartData(cart)
    alert("Item removed from cart")
  }

  return (
    <Stack direction='row' alignItems='flex-start' justifyContent='flex-start' width='300px' mx='8px' p='8px'>
      <Card sx={{ width: '300px' }} >
        <CardMedia sx={{ height: '240px', objectFit: 'contain', }} component='img' image={image} alt={title} />
        <CardContent>
          <Stack alignItems='center'>
            <Typography gutterBottom variant='h6' textAlign='center'>
              {title}
            </Typography>
            <Typography gutterBottom variant='subtitle1' textAlign='center'>
              Price: ${price}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction='row' alignItems='center' justifyContent='center' gap="8px" width='100%' mx="8px" marginBottom="16px">
            {
              data.qty < 2 ? <Button value={data._id} onClick={handleDeleteItem} variant='contained' fullWidth={false} >-</Button> : <Button value={data._id} onClick={handleDecreaseQty} variant='contained' fullWidth={false} >-</Button>
            }
            {data.qty}
            <Button value={data._id} onClick={handleIncreaseQty} variant='contained' fullWidth={false} >+</Button>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default CartItemCard