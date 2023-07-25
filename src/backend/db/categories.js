import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "t-shirts",
    description:
      "t-shirts",
  },
  {
    _id: uuid(),
    categoryName: "shirts",
    description:
      "shirts",
  },
  {
    _id: uuid(),
    categoryName: "jeans",
    description:
      "jeans",
  },
  {
    _id: uuid(),
    categoryName: "shoes",
    description:
      "shoes",
  },
];
