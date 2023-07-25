import React, { useState } from 'react'
import { ACTIONS, useGlobalContext } from '../context/dataContext'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'

const FiltersSection = () => {
    const { dispatch } = useGlobalContext()
    const [ maxRange, setMaxRange ] = useState(8000)

    const [ checkboxCategory, setCheckboxCategory ] = useState([])
    const [ checkboxRating, setCheckboxRating ] = useState([])

    const handleCheckboxCategory = (event) => {
        const index = checkboxCategory.indexOf(event.target.value)
        if(index === -1 ) {
            setCheckboxCategory([ ...checkboxCategory, event.target.value ])
            dispatch({ type: ACTIONS.SET_CATEGORY, payload: event.target.value })
        } else {
            setCheckboxCategory(checkboxCategory.filter((checkboxCategory) => checkboxCategory !== event.target.value))
            dispatch({ type: ACTIONS.REMOVE_CATEGORY, payload: event.target.value })
        }
    }

    const handleCheckboxRating = (event) => {
        const index = checkboxRating.indexOf(event.target.value)
        if(index === -1 ) {
            setCheckboxRating([ ...checkboxRating, event.target.value ])
            dispatch({ type: ACTIONS.SET_RATING, payload: Number(event.target.value) })
        } 
        else {
            setCheckboxRating(checkboxRating.filter((checkboxRating) => checkboxRating !== event.target.value))
            dispatch({ type: ACTIONS.REMOVE_RATING, payload: Number(event.target.value) })
        }
    }

    const handlePriceRange = (event) => {
        setMaxRange(event.target.value);
        dispatch({ type: ACTIONS.SET_PRICE_RANGE, payload: Number(event.target.value) });
    }

    const handleSortBy = (event) => {
        dispatch({ type: ACTIONS.SORT_BY, payload: event.target.value })
    }

    const handleResetFilters = () => {
        setMaxRange(8000)
        setCheckboxCategory([])
        setCheckboxRating([])
        dispatch({ type: ACTIONS.RESET_FILTERS, payload: ""})
    }


  return (
    <Stack direction='column' width="10%" gap='12px'>
        <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h6'>
                Filters
            </Typography>
            <Button variant='outlined' size='small' onClick={handleResetFilters}>
                Clear
            </Button>
        </Stack>
        <Divider />
        <Box>
            <FormControl>
                <FormLabel>Sort</FormLabel>
                <RadioGroup>
                    <FormControlLabel control={<Radio onChange={handleSortBy} />} label='Low to High' value='lowToHigh' />
                    <FormControlLabel control={<Radio onChange={handleSortBy} />} label='High to Low' value='highToLow' />
                </RadioGroup>
            </FormControl>
        </Box>
        <Divider />
        <div className="sort-container">
            <p style={{ fontSize: "1.2rem", margin: "0.2rem", fontFamily:'Poppins' }}>Price Range: </p>
            <input type="range" id="priceRange" min="499" max="8000" onChange={handlePriceRange} style={{ width: "100%" }} value={maxRange} className="accent-color"></input>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily:"Poppins" }}>₹ 499</span>
                <span style={{ fontFamily:"Poppins" }}>₹ {maxRange}</span>
            </div>
        </div>
        <Divider />
        <Box>
            <FormControl>
                <FormLabel>Category</FormLabel>
                <FormGroup>
                    <FormControlLabel label='T-shirt' value='t-shirt' control={<Checkbox  checked={checkboxCategory.includes('t-shirt')} onChange={handleCheckboxCategory} />} />
                    <FormControlLabel label='Shirt' value='shirt' control={<Checkbox checked={checkboxCategory.includes('shirt')} onChange={handleCheckboxCategory}  />} />
                    <FormControlLabel label='Jeans' value='jeans' control={<Checkbox checked={checkboxCategory.includes('jeans')} onChange={handleCheckboxCategory}  />} />
                    <FormControlLabel label='Shoes' value='shoes' control={<Checkbox checked={checkboxCategory.includes('shoes')} onChange={handleCheckboxCategory}  />} />
                </FormGroup>
            </FormControl>
        </Box>
        <Divider />
        <Box>
            <FormControl>
                <FormLabel>Rating</FormLabel>
                <FormGroup>
                    <FormControlLabel label='4.0 & more' value='4.0' control={<Checkbox checked={checkboxRating.includes('4.0')} onChange={handleCheckboxRating}  />} />
                    <FormControlLabel label='3.0 & more' value='3.0' control={<Checkbox checked={checkboxRating.includes('3.0')} onChange={handleCheckboxRating}  />} />
                    <FormControlLabel label='Below 3.0' value='1.0' control={<Checkbox checked={checkboxRating.includes('1.0')} onChange={handleCheckboxRating}  />} />
                </FormGroup>
            </FormControl>
        </Box>
    </Stack>
  )
}

export default FiltersSection