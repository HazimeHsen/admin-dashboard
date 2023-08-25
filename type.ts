// export interface Product {
//     id: string;
//     category: Category;
//     name: string;
//     price: string;
//     isFeatured: boolean;
//     size: Size;
//     color: Color;
//     images: Image[]
//   };
export interface User {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
}
export interface Order {
  id: string;
  userId: string;
  totalCost: number;
  quantity: number;
  country: string;
  city: string;
  postalCode: string;
  state: string;
  streetAddress: string;
  paymentMethod: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Product {
  id: string;
  discount: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  images: string[];
  description: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
