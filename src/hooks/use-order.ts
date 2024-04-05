import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

function useOrder(id: number, disabled?: boolean) {
  const {
    data: orderData,
    status: orderStatus,
    error: orderError,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      return api.getOrder(id);
    },
    enabled: !disabled,
  });
  return {
    orderData,
    orderStatus,
    orderError,
    refetchOrder,
  };
}

export default useOrder;
