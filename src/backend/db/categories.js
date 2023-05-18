import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Fiction",
    description:
      "Where reality meets extraordinary adventures.",
  },
  {
    _id: uuid(),
    categoryName: "Non-fiction",
    description:
      "Discover the remarkable true stories that shape our world.",
  },
  {
    _id: uuid(),
    categoryName: "Science-Fiction",
    description:
      "Where science meets limitless possibilities in a universe of wonders",
  },
  {
    _id: uuid(),
    categoryName: "Self-Help",
    description:
      "Inspiration and guidance to create the life you've always dreamed of.",
  },
];
