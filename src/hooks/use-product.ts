import { useQuery } from '@tanstack/react-query';
import { setItem, useAppDispatch, useAppSelector } from '../store';
import { api } from '../api';
import { useCallback } from 'react';

function useProduct(disabled?: boolean) {
  const item = useAppSelector((state) => state.ui.item);
  const dispatch = useAppDispatch();
  const { status: productStatus, data: productData } = useQuery({
    queryKey: ['product', item.currentItem],
    queryFn: async () => {
      return api.getProduct(item.currentItem!);
    },
    enabled: !!item.currentItem && !disabled,
  });

  const openItem = useCallback(
    (currentItem: number) => {
      dispatch(setItem({ itemIsOpen: true, currentItem }));
    },
    [dispatch]
  );

  const closeItem = useCallback(() => {
    dispatch(setItem({ itemIsOpen: false, currentItem: null }));
  }, [dispatch]);

  return {
    openItem,
    closeItem,
    productData,
    productStatus,
    ...item,
  };
}

export default useProduct;
