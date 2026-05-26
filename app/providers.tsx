'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3000}
        hideProgressBar
        limit={3}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </LanguageProvider>
  );
}
