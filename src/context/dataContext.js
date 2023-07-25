import React, { useState, useContext, useEffect, useReducer } from "react";

const AppContext = React.createContext();

export const ACTIONS = {
    FOUNDUSER: "foundUser",
    LOGIN: "login",
    LOGOUT: "logout",
    UPDATE_CATEGORIES: "updateCategories",
    UPDATE_PRODUCTS: "updateProducts",
    SET_HOME_CATEGORY: "setHomeCategory",
    SEARCH: 'search',
    SORT_BY: 'sortBy',
    SET_PRICE_RANGE: 'setPriceRange',
    SET_CATEGORY: 'setCategory',
    REMOVE_CATEGORY: 'removeCategory',
    SET_RATING: 'setRating',
    REMOVE_RATING: 'removeRating',
    RESET_FILTERS: 'resetFilters',
}

const AppProvider = ({children}) => {

    const [db, setDb] = useState('');
    const [users, setUsers] = useState();
    const [selectedHomeCategory, setSelectedHomeCategory] = useState("");
    const[cartData, setCartData] = useState([]);
    const[wishlistData, setWishlistData] = useState([]);

    const reducerFunction = (state, {type, payload}) => {
        switch(type) {
            case ACTIONS.FOUNDUSER:
                return { ...state, foundUser: payload };
            case ACTIONS.LOGIN:
                return { ...state, isLoggedIn: true };
            case ACTIONS.LOGOUT:
                return { ...state, isLoggedIn: false };
            case ACTIONS.UPDATE_CATEGORIES:
                return { ...state, categories: payload };
            case ACTIONS.UPDATE_PRODUCTS:
                return { ...state, products: payload };
            case ACTIONS.SET_HOME_CATEGORY:
                return { ...state, category: [payload]};
            case ACTIONS.SEARCH:
                return { ...state, searchFilter: payload };
            case ACTIONS.SORT_BY:
                return { ...state, sortBy: payload };
            case ACTIONS.SET_PRICE_RANGE:
                return { ...state, range: payload };
            case ACTIONS.SET_CATEGORY:
                return {...state, category: [...state.category, payload]};
            case ACTIONS.REMOVE_CATEGORY:
                return {...state, category: state.category.filter((categoryName)=> categoryName !== payload)};
            case ACTIONS.SET_RATING:
                return {...state, rating: [...state.rating, payload]};
            case ACTIONS.REMOVE_RATING:
                return {...state, rating: state.rating.filter((rating)=> rating !== payload)};
            case ACTIONS.RESET_FILTERS:
                return { ...state, sortBy: "lowToHigh", range: [8000], category: [], rating: [] };
            default:
                return {...state};
        }
    }

    const reducerInitialValue = {
        foundUser: {},
        isLoggedIn: false,
        categories: [],
        products: [],
        searchFilter: "",
        sortBy: "",
        range: 0,
        category: [],
        rating: []
    }

    const [state, dispatch] = useReducer(reducerFunction, reducerInitialValue)

    const getCategories = async () => {
        try{
            const response = await fetch("/api/categories")
            const data = await response.json()

            dispatch({ type: ACTIONS.UPDATE_CATEGORIES, payload: data.categories })
        } catch(error) {
            console.log(error)
        }
    }

    const getProducts = async () => {
        try{
            const response = await fetch("/api/products")
            const data = await response.json()

            dispatch({ type: ACTIONS.UPDATE_PRODUCTS, payload: data.products })
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
        getProducts()
    }, []);

return <AppContext.Provider value={{state, dispatch, db, setDb, users, setUsers, getCategories, getProducts, selectedHomeCategory, setSelectedHomeCategory, cartData, setCartData, wishlistData, setWishlistData}}>{children}</AppContext.Provider>
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider};