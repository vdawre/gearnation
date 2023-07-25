import React from 'react'
import '../styles.css'
import { ACTIONS, useGlobalContext } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate()

    const { dispatch } = useGlobalContext()

    const handleSearch = (e) => {
        navigate("/store")
        dispatch({ type: ACTIONS.SEARCH, payload: e.target.value})
    }

  return (
    <div>
        <input type='search' className='searchBar' placeholder='Looking for something?' onChange={handleSearch} />
    </div>
  )
}

export default SearchBar