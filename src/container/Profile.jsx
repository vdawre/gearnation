import React, { useState } from 'react'
import { ACTIONS, useGlobalContext } from '../context/dataContext'
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { Navbar } from '../components/'

const Profile = () => {
  const { state: { foundUser }, dispatch, addresses, setAddresses } = useGlobalContext()
  const [toggleAddressForm,setToggleAddressForm] = useState(false);

  let newAddress = { name:"", pincode:"", city:"", state:""}

  const handleLogout = () => {
    dispatch({ type: ACTIONS.LOGOUT })
  }

  const handleDeleteAddress = (event) => {
    setAddresses(() => addresses.filter((address, index)=> index !== Number(event.target.value)));
    alert("Address deleted");
  }

  const handleUpdateNewAddress = (event) => {
    event.preventDefault();
    [...event.target.elements].forEach((element,index) =>{
      if(index < 5){
        newAddress[element.id] = element.value;
      }
    });
    setAddresses([...addresses,newAddress]);
    setToggleAddressForm(false);
    event.target.reset();
    alert("You added a new address");
  }

  return (
    <>
      <Navbar />
      <Stack width='100%' sx={{ mx:{ xs:'16px', md:'32px'}, my:{ xs:'8px', md:'16px'}}} >
        <Box marginBottom='32px'>
          <Typography variant='h4' marginBottom='32px'>Details</Typography>
          <Stack direction='row' alignItems='center' gap='32px' marginBottom='16PX'>
            <Avatar src={foundUser.image} alt='user image' sx={{ width: 128, height: 128 }} />
            <Box>
              <Typography variant='h6'>{foundUser.firstName} {foundUser.lastName}</Typography>
              <Typography variant='subtitle1' gutterBottom>{foundUser.email}</Typography>
              <Button variant='outlined' onClick={handleLogout} >Logout</Button>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Typography variant='h6' marginBottom='16px'>Address Details</Typography>
          <Button variant='outlined' marginBottom='32px' onClick={() => setToggleAddressForm(!toggleAddressForm) } >{toggleAddressForm ? "Close" : "Add New Address +"}</Button>
          <form style={{ display: toggleAddressForm ? "flex" : "none", marginTop:'16px'}} onSubmit={handleUpdateNewAddress}>
            <Stack direction="column" gap={1} width="340px">
              <Typography variant='subtitle1' fontWeight='500' >Form Details</Typography>
              <TextField label="Name" variant='outlined' type='text' id='name' size='small' />
              <TextField label="Pincode" variant='outlined' type='number' id='pincode' size='small' />
              <TextField label="City" variant='outlined' type='text' id='city' size='small' />
              <TextField label="State" variant='outlined' type='text' id='state' size='small' />
              <Button variant='contained' type='submit'>Save Address</Button>
            </Stack>
          </form>
          {
            addresses.map((address, index) => 
              <Box key={index}>
                <Typography variant='subtitle1' my='16px'>{address.name}, Pincode: {address.pincode}, {address.city}, {address.state}</Typography>
                <Box>
                  <Button variant='outlined' value={index} onClick={handleDeleteAddress} >Delete</Button>
                </Box>
              </Box>
            )
          }
        </Box>
      </Stack>
    </>
  )
}

export default Profile