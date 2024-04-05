import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './routes.tsx';
import { RouterProvider } from 'react-router-dom';
import ReactQueryProvider from './providers/react-query.provider';
import StoreProvider from './providers/store.provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </StoreProvider>
  </React.StrictMode>
);
