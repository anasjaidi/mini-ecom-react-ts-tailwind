import { FaCheck } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { IProduct } from '../api';
import useProduct from '../hooks/use-product';

interface IProps {
  product: IProduct;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  isInCart: boolean;
}

export const Card = ({
  product: data,
  onAddToCart,
  isInCart,
  onRemoveFromCart,
}: IProps) => {
  const { openItem } = useProduct(true);
  const renderIcon = () => {
    if (!isInCart) {
      return (
        <div
          className='absolute top-0 right-0 p-1 m-1 text-center align-middle flex justify-center items-center w-6 h-6 bg-slate-50/80 shadow-lg font-bold rounded-full drop-shadow-2xl mix-blend-normal'
          onClick={() => onAddToCart()}
        >
          <FaPlusCircle />
        </div>
      );
    } else {
      return (
        <div
          className='absolute top-0 right-0 p-1 m-1 text-center align-middle flex justify-center items-center w-6 h-6 font-bold  bg-slate-50/80 shadow-lg drop-shadow-2xl rounded-full'
          onClick={() => onRemoveFromCart()}
        >
          <FaCheck />
        </div>
      );
    }
  };

  return (
    <div
      className='bg-white cursor-pointer w-56 rounded-lg card flex flex-col justify-between shadow-lg p-3'
      onClick={() => openItem(data.id)}
    >
      <figure className='relative mb-2 w-full '>
        <span className='absolute top-0 left-0 p-1 rounded-3xl m-1 bg-white/60 text-black text-sm '>
          {data.category}!
        </span>
        <img
          className='rounded-lg object-cover'
          src={data.image}
          alt='headphones'
        />
        {renderIcon()}
      </figure>
      <p className='flex justify-between'>
        <span className='text-sm font-bold'>{data.title.slice(0, 20)}</span>
        <span>${data.price}</span>
      </p>
    </div>
  );
};
