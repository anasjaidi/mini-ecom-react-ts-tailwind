import { FaWindowClose } from 'react-icons/fa';
import { OrderCard } from './order-card';
import { useCart } from '../hooks/use-cart';
import useOrders from '../hooks/use-orders';

export function CheckoutSideMenu() {
  const {
    toggleCheckoutCb,
    removeFromCartCallback,
    cartData,
    cartStatus,
    cart,
    count,
  } = useCart();

  const { checkoutCb } = useOrders();

  const isLoading = cartStatus == 'pending';
  const isError = cartStatus == 'error';
  const isSuccess = cartStatus == 'success';

  return (
    <aside
      className={`${
        cart ? 'flex ' : 'hidden '
      } checkout-side-menu rounded-lg flex flex-col fixed right-0 border bg-white border-black`}
    >
      <div className='flex justify-between items-center p-6'>
        <FaWindowClose onClick={toggleCheckoutCb} />
        <h2 className='font-medium text-xl'>My Order</h2>
      </div>
      <div className='px-6'>
        {isLoading && <p>loading...</p>}
        {isError && <p>error...</p>}
        {isSuccess &&
          cartData?.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              handleDelete={removeFromCartCallback}
            />
          ))}
      </div>
      <div className='px-6'>
        <p>
          <span>Total: </span>
          <span>${count}</span>
        </p>

        <button
          className='bg-slate-500  text-fuchsia-50 py-3 px-5 rounded-lg mt-3 text-base'
          onClick={() => checkoutCb()}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}
