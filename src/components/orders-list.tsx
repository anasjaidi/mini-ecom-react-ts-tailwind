import { Container } from './container';
import useOrders from '../hooks/use-orders';
import { Link } from 'react-router-dom';
import { OrdersCard } from './orders-card';

export function OrdersList() {
  const { ordersData, ordersStatus } = useOrders();
  return (
    <Container>
      <div className='flex justify-center items-center w-80 relative'>
        <h1 className='font-medium text-xl mb-3'>MyOrders</h1>
      </div>
      {ordersStatus == 'pending' && <p>loading...</p>}
      {ordersStatus == 'error' && <p>error...</p>}
      {ordersStatus == 'success' &&
        ordersData?.map((order) => (
          <Link key={order.id} to={`/my-orders/${order.id}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalItems}
              date={order.date}
            />
          </Link>
        ))}
    </Container>
  );
}
