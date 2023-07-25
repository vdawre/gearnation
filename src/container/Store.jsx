import React from 'react'
import { FiltersSection, Navbar, ProductCard } from '../components'
import { Stack } from '@mui/material'
import { useGlobalContext } from '../context/dataContext'

const Store = () => {
  const { state } = useGlobalContext()

  const filteredData = () => {
    let temp = []

    const sortData = (sortBy) => {
        if (sortBy === "lowToHigh") {
            return temp.slice().sort((a, b) => a.price - b.price)
        }
        else if(sortBy === "highToLow") {
            return temp.slice().sort((a, b) => b.price - a.price)
        }
    }

    const filterDataByCategory = (category) => {
      return temp.filter((product) => category.includes(product.categoryName));
    }

    const filterDataByRating = (rating) => {
      return temp.filter((product) => rating.includes(product.rating));
    }

    temp = state.searchFilter === "" ? state.products : state.products.filter((product)=>product.title.toUpperCase().includes(state.searchFilter.toUpperCase()));
    temp = state.sortBy === "" ? temp : sortData(state.sortBy);
    temp = state.range === 0 ? temp : temp.filter((product)=> product.price < state.range);
    temp = state.category.length === 0 ? temp : filterDataByCategory(state.category);
    temp = state.rating === 0 ? temp : temp.filter((product)=> product.rating >= state.rating);

    return temp;
  }

  return (
    <>
      <Navbar />
      <Stack direction='row' width='100%' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}} justifyContent='space-between'>
        <FiltersSection />
        <Stack direction='row' width='90%' flexWrap='wrap' alignItems='stretch' justifyContent='flex-start' gap='32px'>
          {
            filteredData().map((productData) => <ProductCard data={productData} key={productData._id} />)
          }
        </Stack>
      </Stack>
    </>
    
  )
}

export default Store