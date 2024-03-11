'use client';

import { useEffect } from 'react';
import { ProductProp } from './Interfaces/Interfaces';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Product from './Product';

const Products = () => {
  const { ref, inView } = useInView();

  const fetchProducts = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      `https://dummyjson.com/products?skip=${pageParam}&limit=10`
    );
    const data = await res.json();
    return data.products;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length * 10 : undefined;
      return nextPage;
    },
  });

  const content = data?.pages.map((products: ProductProp[]) =>
    products?.map((item, index) => {
      if (products.length === index + 1) {
        return <Product innerRef={ref} key={item.id} {...item} />;
      }
      return <Product key={item.id} {...item} />;
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }
  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }
  return (
    <body className="">
      {content}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </body>
  );
};

export default Products;
