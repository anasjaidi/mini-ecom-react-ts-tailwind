import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { useCallback, useEffect } from 'react';
import { useCart } from './use-cart';
import { toast } from 'react-toastify';

function useOrders() {
  const { refetchCart, toggleCheckoutCb } = useCart();
  const {
    data: ordersData,
    status: ordersStatus,
    error: ordersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      return api.getOrders();
    },
  });
  const {
    mutateAsync: checkout,
    status: checkoutStatus,
    submittedAt: checkoutSubmittedAt,
    error: checkoutError,
  } = useMutation({
    mutationKey: ['checkout'],
    mutationFn: async () => {
      try {
        return api.checkout();
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },
  });

  const checkoutCb = useCallback(async () => {
    await checkout();
    await refetchCart();
  }, [checkout, refetchCart]);

  useEffect(() => {
    if (checkoutStatus === 'error') {
      toast.error(checkoutError?.message || 'An error occurred');
    } else if (checkoutStatus === 'success') {
      toast.success('Checkout successful');
      toggleCheckoutCb();
    }
  }, [checkoutStatus, checkoutSubmittedAt, checkoutError, toggleCheckoutCb]);

  return {
    checkoutCb,
    checkoutStatus,
    checkoutSubmittedAt,
    checkoutError,
    ordersData,
    ordersStatus,
    ordersError,
    refetchOrders,
  };
}

export default useOrders;
