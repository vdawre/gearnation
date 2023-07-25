import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "Black T-shirt",
    price: 799,
    categoryName: "t-shirt",
    rating:4.9,
    image:"/images/black-tshirt.png",
  },
  {
    _id: uuid(),
    title: "Green T-shirt",
    price: 649,
    categoryName: "t-shirt",
    rating:3.2,
    image:"/images/green-tshirt.png",
  },
  
  {
    _id: uuid(),
    title: "Orange T-shirt",
    price: 649,
    categoryName: "t-shirt",
    rating:3.6,
    image:"/images/orange-tshirt.png",
  },
  {
    _id: uuid(),
    title: "Black Formal Shirt",
    price: 1299,
    categoryName: "shirt",
    rating:4.6,
    image:"/images/black-shirt.png",
  },
  {
    _id: uuid(),
    title: "White Formal Shirt",
    price: 1099,
    categoryName: "shirt",
    rating:4.3,
    image:"/images/white-shirt.png",
  },
  {
    _id: uuid(),
    title: "Regular Fit Blue Jeans",
    price: 1499,
    categoryName: "jeans",
    rating:4.5,
    image:"/images/blue-jeans.png",
  },
  {
    _id: uuid(),
    title: "Blue Jeans Cropped",
    price: 1899,
    categoryName: "jeans",
    rating:4.6,
    image:"/images/blue-jeans-cropped.png",
  },
  {
    _id: uuid(),
    title: "Denim Blue Jeans",
    price: 2199,
    categoryName: "jeans",
    rating:3.9,
    image:"/images/denim-jeans.png",
  },
  {
    _id: uuid(),
    title: "Nike Air Jordan",
    price: 7999,
    categoryName: "shoes",
    rating:5.0,
    image:"/images/air-jordan.png",
  },
  {
    _id: uuid(),
    title: "Leather Fashion Shoe",
    price: 2499,
    categoryName: "shoes",
    rating:4.2,
    image:"/images/fashion-shoes.png",
  },
  {
    _id: uuid(),
    title: "Black Formal Shoe",
    price: 1999,
    categoryName: "shoes",
    rating:3.6,
    image:"/images/formal-shoes.png",
  },
  {
    _id: uuid(),
    title: "Nike Running Shoe",
    price: 3499,
    categoryName: "shoes",
    rating:4.3,
    image:"/images/green-shoes.png",
  },
];
