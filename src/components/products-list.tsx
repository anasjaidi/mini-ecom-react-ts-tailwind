import { useState } from 'react';
import { useProducts } from '../hooks/use-products';
import { Card } from './card';
import { Container } from './container';
import { ProductDetail } from './product-details';

interface IProps {
    category?: string;
}

function ProductsList(
    { category }: IProps
) {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    addToCartCallback,
    removeFromCartCallback,
    refetchProducts,
    cartData,
    cartStatus,
    productsData,
    productStatus,
  } = useProducts(searchQuery, category);

  const isLoading = cartStatus == 'pending' || productStatus == 'pending';
  const isError = cartStatus == 'error' || productStatus == 'error';
  const isSuccess = cartStatus == 'success' && productStatus == 'success';

  const renderView = () => {
    if (productsData?.length || 0 > 0) {
      return (
        <>
          {productsData?.map((product) => (
            <Card
              isInCart={!!cartData?.find((p) => product.id === p.id)}
              key={product.id}
              product={product}
              onAddToCart={() => addToCartCallback(product.id)}
              onRemoveFromCart={() => removeFromCartCallback(product.id)}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <h2 className='w-full text-center text-xl'>
            No products match the search criteria
          </h2>
        </>
      );
    }
  };

  return (
    <Container>
      <div className='flex justify-center items-center w-80 relative mb-5'>
        <h1 className='font-medium text-xl mb-3'>Products</h1>
      </div>
      <input
        placeholder='Search your products'
        className='rounded-lg border-black border-2 w-120 p-4 mb-4 focus:outline-none '
        onChange={(event) => {
          setSearchQuery(event.target.value);
          refetchProducts();
        }}
      />
      <section className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
        {isLoading && (
          <div className='flex justify-center items-center w-full h-full'>
            <p>Loading...</p>
          </div>
        )}
        {isError && (
          <div className='flex justify-center items-center w-full h-full'>
            <p>Error fetching data</p>
          </div>
        )}
        {isSuccess && renderView()}
      </section>
      <ProductDetail />
    </Container>
  );
}

export default ProductsList;
