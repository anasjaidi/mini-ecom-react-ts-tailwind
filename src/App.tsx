import { Outlet } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { CheckoutSideMenu } from './components/sideCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <CheckoutSideMenu />
      <ToastContainer />
    </>
  );
}

export default App;
