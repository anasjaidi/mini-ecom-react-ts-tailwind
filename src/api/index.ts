import { products } from './data';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}

export interface IOrder {
  id: number;
  products: IProduct[];
  date: Date;
  totalPrice: number;
  totalItems: number;
}

export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  orders: IOrder[];
  cart: number[];
}

export class Api {
  user: IUser | null;
  cart: number[];
  constructor() {
    this.user = null;
    this.cart = [];
  }
  async login(email: string, password: string) {
    this.user = {
      email,
      password,
      orders: [],
      cart: this.cart,
    };
    return { ...this.user };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.user = {
      email,
      password,
      firstName,
      lastName,
      orders: [],
      cart: this.cart,
    };
    return { ...this.user };
  }

  getProducts(searchQuery?: string, category?: string) {
    return searchQuery
      ? (products.filter((product) =>
          category
            ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
              product.category.includes(category as string)
            : product.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) as IProduct[])
      : category
      ? products.filter((product) =>
          product.category.includes(category as string)
        )
      : (products as IProduct[]);
  }
  getProduct(id: number) {
    return products.find((product) => product.id === id) as
      | IProduct
      | undefined;
  }

  addToCart(id: number) {
    if (!this.user) {
      this.cart.push(id);
    } else {
      this.user?.cart.push(id);
      return this.user;
    }
  }
  removeFromCart(id: number) {
    if (!this.user) {
      this.cart = this.cart.filter((productId: number) => productId !== id);
      return this.cart;
    }
    this.user.cart = this.user.cart.filter(
      (productId: number) => productId !== id
    );
    return this.user.cart;
  }

  logout() {
    this.user = null;
    return (
      this.user || {
        email: '',
        password: '',
        orders: [],
        cart: [],
      }
    );
  }
  getCart() {
    if (!this.user)
      return (
        (this.cart.map((productId: number) =>
          this.getProduct(productId)
        ) as IProduct[]) || []
      );
    return (
      (this.user.cart.map((productId: number) =>
        this.getProduct(productId)
      ) as IProduct[]) || []
    );
  }

  private clearCart() {
    if (this.user) {
      this.user.cart = [];
    }
    this.cart = [];
  }

  checkout() {
    const products = this.getCart();
    if (!this.user) throw new Error('User not logged in');
    this.user.orders.push({
      id: this.user.orders.length + 1,
      products: products,
      date: new Date(),
      totalPrice: products.reduce(
        (acc: number, product: IProduct) => acc + product.price,
        0
      ),
      totalItems: products.length,
    });
    this.clearCart();
    return this.user;
  }
  getOrders() {
    if (!this.user) return [];
    return this.user.orders;
  }
  getOrder(id: number) {
    if (!this.user) return null;
    return this.user.orders.find((order: IOrder) => order.id === id);
  }
}

export const api = new Api();
