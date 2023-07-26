import '../styles.css'

import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, useGlobalContext } from '../context/dataContext'

const cardStyles = {
    width:{xs:'100%',md:'306px'}, 
    height:'200px', 
    alignItems:'start', 
    justifyContent:'end', 
    borderRadius:'8px', 
    p:"32px",
    my:'16px'
}

const cardBoxStyles = {
    width:'91.4%',
    bgcolor:'inherit',
    height:'auto',
    justifyContent:'space-evenly',
    flexWrap:'wrap',
    marginTop:'32px',
}

const HomeLayout = () => {
    const navigate = useNavigate()

    const { dispatch } = useGlobalContext()

    const handlleClickedCategory = (event) => {
        dispatch({ type: ACTIONS.SET_CATEGORY, payload: event.target.id })
        navigate("/store")
    }

  return (
    <Stack alignItems='center'>
        <Box display='flex' width='91.4%' height='540px' marginTop='8px' borderRadius='8px' justifyContent='center' alignItems='center' sx={{ backgroundImage:"url('images/explore.jpg')", objectFit:'cover', backgroundPosition:'center', boxShadow:8 }} onClick={()=>navigate(`/store`)}>
            <div className="container">
                <div className="overlay">
                    <div className="projectedText">View Collection</div>
                </div>
            </div>
        </Box>
        <Stack sx={cardBoxStyles} direction='row' >
            <Stack sx={cardStyles} bgcolor='#EFEEEA' color='#8A8984' boxShadow={4} >
                <Typography textAlign='left'>
                    trendsetting
                </Typography>
                <Typography variant='h2' fontWeight='700' id="t-shirts" onClick={handlleClickedCategory}>
                    T-SHIRTS
                </Typography>
                <Typography textAlign='left'>
                    collection
                </Typography>
            </Stack>
            <Stack sx={cardStyles} bgcolor='#CAE9C7' color='#728870' boxShadow={4} >
                <Typography textAlign='left'>
                From classic
                </Typography>
                <Typography variant='h2' fontWeight='700' id="shirts" onClick={handlleClickedCategory}>
                    SHIRTS
                </Typography>
                <Typography textAlign='left'>
                to contemporary styles
                </Typography>
            </Stack>
            <Stack sx={cardStyles} bgcolor='#C0B194' color='#575042' boxShadow={4} >
                <Typography textAlign='left'>
                curated collection of premium 
                </Typography>
                <Typography variant='h2' fontWeight='700' id="jeans" onClick={handlleClickedCategory}>
                    JEANS
                </Typography>
                <Typography textAlign='left'>
                designed to fit and flatter
                </Typography>
            </Stack>
            <Stack sx={cardStyles} bgcolor='#191A1E' color='#666A7A' boxShadow={4} >
                <Typography textAlign='left'>
                our
                </Typography>
                <Typography variant='h2' fontWeight='700' id="shoes" onClick={handlleClickedCategory}>
                    SHOES
                </Typography>
                <Typography textAlign='left'>
                blend comfort and fashion effortlessly
                </Typography>
            </Stack>
        </Stack>
    </Stack>
  )
}

export default HomeLayout