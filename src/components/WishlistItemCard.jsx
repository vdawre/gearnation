import React from 'react'
import { Button, Stack, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material'
import { useGlobalContext } from '../context/dataContext'

const WishlistItemCard = ({ data }) => {
    const { title, price, image } = data

    const { setWishlistData, state, cartData, setCartData } = useGlobalContext()

    const handleRemoveItem = async (event) => {
        const productId = event.target.value
        const encodedToken = localStorage.getItem("encodedToken")
        try {
            const response = await fetch(`/api/user/wishlist/${productId}`, {
                method: "DELETE",
                headers: {
                    authorization: encodedToken,
                }
            });
            const { wishlist } = await response.json()
            setWishlistData(wishlist)
            alert("Item removed from wishlist")
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddItemToCart = async (event) => {
        const selectedItem = state.products.find(({ _id }) => _id === event.target.value)
        const encodedToken = localStorage.getItem("encodedToken")
        const isItemPresent = cartData.indexOf((product) => product._id === selectedItem._id)
        if (state.isLoggedIn === true && isItemPresent === -1) {
            try {
                const response = await fetch("/api/user/cart", {
                    method: "POST",
                    headers: {
                        authorization: encodedToken,
                    },
                    body: JSON.stringify({ product: selectedItem }),
                })
                const { cart } = await response.json()
                setCartData(cart)
            }
            catch (error) {
                console.log(error)
            }
        } else {
            if (state.isLoggedIn === false) {
                alert("Please login first")
            } else {
                const incrementQty = async () => {
                    const response = await fetch(`/api/user/cart/${selectedItem._id}`, {
                        method: "POST",
                        headers: {
                            authorization: encodedToken,
                        },
                        body: JSON.stringify({ action: { type: "increment" } }),
                    })
                    const { cart } = await response.json()
                    setCartData(cart)
                }
                incrementQty()
            }
        }
        handleRemoveItem(event)
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
                        <Button value={data._id} onClick={handleRemoveItem} variant='contained' fullWidth={false} >Remove item</Button>
                        <Button value={data._id} onClick={handleAddItemToCart} variant='contained' fullWidth={false} >Move to cart</Button>
                    </Stack>
                </CardActions>
            </Card>
        </Stack>
    )
}

export default WishlistItemCard