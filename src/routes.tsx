import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { HomeContainer } from './container/home';
import { ElectronicsContainer } from './container/electronics';
import { FurnituresContainer } from './container/furnitures';
import { ToysContainer } from './container/toys';
import { OrdersContainer } from './container/orders';
import OrderContainer from './container/order';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomeContainer />,
      },

      {
        path: '/electronics',
        element: <ElectronicsContainer />,
      },
      {
        path: '/furnitures',
        element: <FurnituresContainer />,
      },
      {
        path: '/toys',
        element: <ToysContainer />,
      },
      {
        path: '/my-orders',
        element: <OrdersContainer />,
      },
      {
        path: '/my-orders/:id',
        element: <OrderContainer />,
      },
      {
        path: '*',
        element: <div>404</div>,
      }
    ],
  },
]);
