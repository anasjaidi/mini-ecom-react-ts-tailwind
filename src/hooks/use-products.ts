import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { useCart } from './use-cart';

export function useProducts(searchQuery: string, category?: string) {
  const {
    cartData,
    cartError,
    cartStatus,
    addToCartCallback,
    removeFromCartCallback,
    refetchCart,
    toggleCheckoutCb,
  } = useCart();

  const {
    data: productsData,
    status: productStatus,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['products', searchQuery, category],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return api.getProducts(searchQuery, category);
    },
  });

  return {
    cartData,
    cartStatus,
    cartError,
    refetchCart,
    addToCartCallback,
    removeFromCartCallback,
    productsError,
    productsData,
    productStatus,
    refetchProducts,
    toggleCheckoutCb,
  };
}
