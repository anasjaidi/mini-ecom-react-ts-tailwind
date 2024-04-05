import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export function Container({ children }: IProps) {
  return <div className='flex flex-col items-center justify-center mt-20'>{children}</div>;
}

