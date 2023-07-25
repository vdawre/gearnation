import React from 'react'
import { useGlobalContext } from '../context/dataContext'
import { useParams } from 'react-router-dom'
import { Stack } from '@mui/material'
import ProductCard from './ProductCard'

const SingleProduct = () => {
  const { state } = useGlobalContext()
  const { productId } = useParams()
  const selectedItem = state.products.find((product) => product._id === productId )

  return (
    <Stack>
      <ProductCard data={selectedItem} />
    </Stack>
  )
}

export default SingleProduct