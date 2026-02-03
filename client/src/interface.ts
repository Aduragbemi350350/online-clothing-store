export interface Comment {
  _id: string
  user: string;
  product: string;
  text: string;
  like: string[];
  dislike: string[];
  parent: string ;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReview {
  rating: number;
  like: string;
  comments: string[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  createdBy: string;
  slug: string;
  rating: number;
  reviews: ProductReview[];
}

export interface User{
  username: string,
  password: string,
  email: string
}