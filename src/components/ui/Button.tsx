import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        {
          'bg-primary text-white hover:bg-primary/90': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700': variant === 'secondary',
          'border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'outline',
          'hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
        },
        {
          'text-sm px-3 py-1.5': size === 'sm',
          'px-4 py-2': size === 'md',
          'text-lg px-6 py-3': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}