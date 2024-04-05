import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart } from 'react-icons/fa';
import { toggleCart, useAppDispatch } from '../store';
import useAuth from '../hooks/use-auth';
import { useCart } from '../hooks/use-cart';

const activeStyle = 'underline underline-offset-2 text-blue-950';

export function Navbar() {
  const dispatch = useAppDispatch();
  const { isConnected, email, register, login, logout } = useAuth();
  const { toggleCheckoutCb, cartStatus, cartData } = useCart();
  console.log(isConnected);

  const renderLinks = () => {
    return [
      {
        path: '/',
        icon: faHome,
      },
      {
        path: '/electronics',
        text: 'Electronics',
      },
      {
        path: '/furnitures',
        text: 'Furnitures',
      },
      {
        path: '/toys',
        text: 'Toys',
      },
    ].map((link, idx) => (
      <li key={idx}>
        <NavLink
          to={link.path}
          className={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          {link.icon && <FontAwesomeIcon icon={link.icon} />}
          {link.text}
        </NavLink>
      </li>
    ));
  };

  const renderOptions = () => {
    let options: {
      path?: string;
      text: string;
      action?: () => void;
    }[];

    if (isConnected) {
      options = [
        {
          text: email,
          action: () => {},
        },
        {
          path: '/my-orders',
          text: 'My Orders',
        },
        {
          text: 'Sign Out',
          action: () => logout(),
        },
      ];
    } else {
      options = [
        {
          text: 'Sign In',
          action: () => login('anas.jaidi@icloud.com', 'password'),
        },
        {
          text: 'Sign Up',
          action: () =>
            register('anas.jaidi@icloud.com', 'password', 'Anas', 'Jaidi'),
        },
      ];
    }
    return options.map((option, idx) => (
      <li key={idx}>
        {option.path ? (
          <NavLink
            to={option.path}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {option.text}
          </NavLink>
        ) : (
          <button onClick={option.action}>{option.text}</button>
        )}
      </li>
    ));
  };

  const cartCount = cartStatus === 'success' && !!cartData?.length && (
    <p className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs'>
      {cartData?.length}
    </p>
  );

  return (
    <nav className='bg-white/80 sticky flex flex-col justify-between p-1 w-full z-10 px-8 py-5 font-bold border-b-2 top-0'>
      <div className='flex items-center justify-between w-full lg:w-auto'>
        <ul className='flex flex-col lg:flex-row lg:items-center gap-8'>
          {renderLinks()}
        </ul>
        <ul className='flex flex-col lg:flex-row lg:items-center gap-6'>
          {renderOptions()}
          <li
            className='flex gap-1 relative'
            onClick={() => dispatch(toggleCart())}
          >
            {cartCount}
            <FaShoppingCart
              className='text-gray-800 text-2xl'
              onClick={toggleCheckoutCb}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
