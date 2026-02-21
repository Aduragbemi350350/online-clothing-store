export interface Comment {
  _id: string;
  user: string;
  product: string;
  text: string;
  like: string[];
  dislike: string[];
  parent: string;
  children: Comment[]
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  publicKey: string;
  secureURL: string;
  resourceType: string;
  folder: string;
  originalFilename: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: Image[];
  price: number;
  createdBy: string;
  slug: string;
  rating: number;
}

export interface User {
  username: string;
  password: string;
  email: string;
}
