'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Inter } from 'next/font/google';
import Products from './Components/Products';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    </>
  );
}
