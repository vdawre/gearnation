import { Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material'
import React from 'react'
import { useGlobalContext } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({data}) => {
  const navigate = useNavigate()

  const { title, price, rating, image } = data

  const { state, cartData, setCartData, wishlistData, setWishlistData } = useGlobalContext()

  const handleAddToCart = async (event) => {
    const selectedItem = state.products.find(({_id}) => _id === event.target.value)

    const encodedToken = localStorage.getItem("encodedToken")
    const isItemPresent = cartData.indexOf((product) => product._id === selectedItem._id )

    if( state.isLoggedIn === true && isItemPresent === -1 ) {
      try {
        const response = await fetch("api/user/cart", {
          header: {
            authorization: encodedToken,
          },
          body: JSON.stringify({ product: selectedItem }),
        })

        const { cart } = await response.json()
        setCartData(cart)
        alert('Item added to cart')
      } catch(error) {
        console.log(error)
      }
    } else {
      if( state.isLoggedIn === false ) {
        alert("Please Login First")
      } else {
        const incrementItem = async() => {
          const response = await fetch(`/api/user/cart/${selectedItem._id}`, {
              method: "POST",
              headers: {
                  authorization: encodedToken,
              },
              body: JSON.stringify({ action: { type: "increment" } }),
          });
          const { cart } = await response.json();
          setCartData(cart);
        };
        incrementItem();
        alert("Item added to cart");
      }
    }
  }

  const handleAddToWishlist = async (event) => {
    const selectedItem = state.products.find(({ _id }) => _id === event.target.value);
    const encodedToken = localStorage.getItem("encodedToken");
    const isItemPresent = wishlistData.indexOf((product) => product._id === selectedItem._id);
    if (state.isLoggedIn === true && isItemPresent === -1) {
      try {
        const response = await fetch("/api/user/wishlist", {
          method: "POST",
          headers: {
            authorization: encodedToken,
          },
          body: JSON.stringify({ product: selectedItem }),
        });
        const { wishlist } = await response.json();
        setWishlistData(wishlist);
        alert("Item added to wishlist");
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      if (state.isLoggedIn === false) {
        alert("Please login first");
      }
      else {
        alert("Already in wishlist");
      }
    }
  }

  return (
    <>
      <Card sx={{ width: '300px' }} >
        <CardMedia sx={{ height:'240px', objectFit:'contain', }} component='img' image={image} title={title}  />
        <CardContent onClick={ () => navigate(`/store/${data._id}`)}>
          <Stack alignItems='center'>
            <Typography gutterBottom variant='h6' textAlign='center'>
              {title}
            </Typography>
            <Typography gutterBottom variant='subtitle1' textAlign='center'>
              Price: ${price}
            </Typography>
            <Box>
              <Rating name="read-only" value={rating} readOnly />
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction='column' alignItems='center' justifyContent='center' gap="8px" width='100%' mx="8px" marginBottom="16px">
            <Button value={data._id} onClick={handleAddToCart} variant='contained' fullWidth={true} >Add to cart</Button>
            <Button value={data._id} onClick={handleAddToWishlist} variant='outlined' fullWidth={true} >Add to wishlist</Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  )
}

export default ProductCard