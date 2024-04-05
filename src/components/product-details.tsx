import { FaWindowClose } from 'react-icons/fa';
import useProduct from '../hooks/use-product';

export function ProductDetail() {
  const { itemIsOpen, productData, productStatus, closeItem } = useProduct();
  return (
    <aside
      className={`${
        itemIsOpen ? 'flex ' : 'hidden '
      } product-detail rounded-lg flex flex-col fixed right-0 border bg-white border-black`}
    >
      {productStatus === 'pending' && <p>loading...</p>}
      {productStatus === 'error' && <p>error...</p>}
      {productStatus === 'success' && (
        <>
          <div className='flex justify-between items-center p-6'>
            <FaWindowClose onClick={() => closeItem()} />
            <h2 className='font-medium text-xl'>Product Information</h2>
          </div>
          <div className='flex flex-col p-6 gap-2 bg-gray-300 rounded-sm shadow-slate-500'>
            <img
              src={productData?.image ?? 'https://via.placeholder.com/150'}
              className='w-full  rounded-lg product-detail__image'
            />
            <h2 className='bold text-xl font-bold'>
              {productData?.title ?? 'Product Name'}
            </h2>
            <h4 className='font-bold text-lg underline'>
              ${productData?.price ?? '0.00'}
            </h4>
            <p className='italic text-sm'>
              {productData?.description ?? 'Product Description'}
            </p>
          </div>
        </>
      )}
    </aside>
  );
}
