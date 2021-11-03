export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  zipCode: number;
}
