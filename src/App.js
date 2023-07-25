import React from "react";
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import { createTheme, ThemeProvider } from '@mui/material'

import { Cart, Checkout, Home, Login, OrderSummary, Profile, SignUp, Store, Wishlist } from './container';
import { Auth, SingleProduct } from './components';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#EFEEEA'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
})

function App() {
  return (
    <ThemeProvider  theme={theme}>
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Auth><Cart /></Auth>} />
        <Route path="/wishlist" element={<Auth><Wishlist /></Auth>} />
        <Route path="/profile" element={<Auth><Profile /></Auth>} />
        <Route path="/checkout" element={<Auth><Checkout /></Auth>} />
        <Route path="/order-summary" element={<Auth><OrderSummary /></Auth>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
