import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import {
  setItem,
  toggleCheckout,
  useAppDispatch,
  useAppSelector,
} from '../store';

import { useCallback, useEffect, useState } from 'react';

export function useCart(disabled?: boolean) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.ui.checkoutOpen);
  const queryClient = useQueryClient();

  const toggleCheckoutCb = useCallback(() => {
    dispatch(toggleCheckout());
    console.log('toggleCheckoutCb')
  }, [dispatch]);

  const {
    data: cartData,
    status: cartStatus,
    error: cartError,
    refetch: refetchCart,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      console.log('api.getCart()', api.getCart());
      return api.getCart();
    },
    enabled: !disabled,
  });

  const { mutateAsync: addToCart } = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: async (productId: number) => {
      return api.addToCart(productId);
    },
  });

  const { mutateAsync: removeFromCart } = useMutation({
    mutationKey: ['removeFromCart'],
    mutationFn: async (productId: number) => {
      return api.removeFromCart(productId);
    },
  });

  const addToCartCallback = useCallback(
    async (productId: number) => {
      await addToCart(productId);
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
      await refetchCart();
      dispatch(setItem({ itemIsOpen: false, currentItem: null }));
    },
    [addToCart, queryClient, refetchCart, dispatch]
  );

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (cartStatus === 'success')
      setCount(
        cartData.reduce((acc: number, item) => {
          return acc + item.price;
        }, 0)
      );
  }, [cartData, cartStatus, dataUpdatedAt]);

  const removeFromCartCallback = useCallback(
    async (productId: number) => {
      await removeFromCart(productId);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      await refetchCart();
      dispatch(setItem({ itemIsOpen: false, currentItem: null }));
    },
    [removeFromCart, queryClient, refetchCart, dispatch]
  );

  return {
    cart,
    addToCart,
    removeFromCartCallback,
    addToCartCallback,
    removeFromCart,
    cartData,
    toggleCheckoutCb,
    cartStatus,
    cartError,
    refetchCart,
    count: count,
  };
}
