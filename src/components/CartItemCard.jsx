import React from 'react'
import { useGlobalContext } from '../context/dataContext'
import { Box, Button, Stack, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material'

const CartItemCard = ({ data }) => {
  const { title, price, image } = data

  const { setCartData } = useGlobalContext()
  const encodedToken = localStorage.getItem("encodedToken")

  return (
    <Stack direction='row' alignItems='flex-start' justifyContent='flex-start' width='300px' mx='8px' p='8px'>
      <Card sx={{ width: '300px' }} >
        <CardMedia sx={{ height: '240px', objectFit: 'contain', }} component='img' image={image} title={title} />
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
            <Button value={data._id} onClick={() => {}} variant='contained' fullWidth={true} >Add to cart</Button>
            <Button value={data._id} onClick={() => {}} variant='outlined' fullWidth={true} >Add to wishlist</Button>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default CartItemCard