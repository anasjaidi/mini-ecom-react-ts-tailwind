import { Link } from 'react-router-dom';
import useOrder from '../hooks/use-order';
import { Container } from './container';
import { OrderCard } from './order-card';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

interface IProps {
  id: number;
}

export function Order({ id }: IProps) {
  const { orderData, orderStatus } = useOrder(id);

  return (
    <Container>
      <div className='flex justify-center items-center w-80 relative mb-5'>
        <Link to={`/my-orders`} className='absolute left-0'>
          <FaArrowAltCircleLeft />
        </Link>
        <h1 className='font-medium text-xl mb-3'>My Order</h1>
      </div>
      {orderStatus == 'pending' && <p>loading...</p>}
      {orderStatus == 'error' && <p>error...</p>}
      {orderStatus == 'success' &&
        orderData?.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
          />
        ))}
    </Container>
  );
}
