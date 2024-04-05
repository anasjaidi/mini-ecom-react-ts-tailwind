import { useParams } from 'react-router-dom';
import { Order } from '../components/order';

function OrderContainer() {
  const { id } = useParams();
  return <Order id={+id!} />;
}

export default OrderContainer;
