import React from 'react';
import { Path } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  isShaking?: boolean;
  path?: Path | null;
}

const Layout: React.FC<LayoutProps> = ({ children, isShaking, path }) => {
  const isDarkMode = path === 'reality';

  return (
    <div className={`min-h-screen flex justify-center items-center p-5 font-sans leading-relaxed overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-bgLight'}`}>
      <div 
        className={`
          w-full max-w-[600px] rounded-[20px] shadow-2xl p-10 text-center
          transition-all duration-300 ease-in-out relative
          ${isDarkMode 
            ? 'bg-slate-700 text-gray-100 border-2 border-slate-600'
            : 'bg-white text-primary border-2 border-secondary'
          }
          ${isShaking ? 'animate-shake' : ''}
        `}
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;