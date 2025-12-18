import React from 'react';
import { Path } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'choice';
  selected?: boolean;
  fullWidth?: boolean;
  path?: Path;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  selected, 
  fullWidth,
  path,
  className = '',
  ...props 
}) => {
  const baseStyle = "font-bold text-lg border-none cursor-pointer transition-all duration-300 active:translate-y-[2px]";
  const isDarkMode = path === 'reality';
  
  let variantStyle = "";
  if (variant === 'primary') {
    variantStyle = "bg-secondary text-white py-[15px] px-[30px] rounded-[15px] hover:bg-secondaryDark shadow-[0_4px_0px_#7f8c8d] active:shadow-[0_2px_0px_#7f8c8d]";
  } else if (variant === 'choice') {
    variantStyle = `
      p-[15px] my-[5px] w-full text-left rounded-[15px]
      ${selected 
        ? 'bg-secondary text-white' 
        : isDarkMode
          ? 'bg-slate-600 text-gray-200 hover:bg-slate-500'
          : 'bg-[#e0f2f1] text-primary hover:bg-[#c4e4e1]'
      }
    `;
  } else if (variant === 'secondary') {
      variantStyle = "bg-blue-500 text-white py-[15px] px-[30px] rounded-[15px] hover:bg-blue-600 shadow-[0_4px_0px_#2980b9] active:shadow-[0_2px_0px_#2980b9]";
  }

  return (
    <button 
      className={`${baseStyle} ${variantStyle} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;