'use client';

import { motion } from 'framer-motion';
import { Brand } from '@/types';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

interface BrandToggleProps {
  className?: string;
}

export function BrandToggle({ className }: BrandToggleProps) {
  const { currentBrand, switchBrand, isLoading } = useBrand();

  if (isLoading) {
    return (
      <div className={cn("flex items-center space-x-1", className)}>
        <div className="h-12 w-32 bg-gray-200 rounded-pill animate-pulse" />
      </div>
    );
  }

  return (
    <div className={cn("relative flex items-center", className)}>
      <motion.div
        className="flex bg-gray-100 rounded-pill p-1"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.button
          className={cn(
            "relative z-10 px-6 py-3 text-sm font-bold rounded-pill transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          )}
          onClick={() => switchBrand('konnichiwa')}
          whileTap={{ scale: 0.95 }}
        >
          <span className={cn(
            "transition-colors duration-200",
            currentBrand === 'konnichiwa' 
              ? "text-white" 
              : "text-gray-600 hover:text-gray-800"
          )}>
            Konnichiwa Japan
          </span>
        </motion.button>
        
        <motion.button
          className={cn(
            "relative z-10 px-6 py-3 text-sm font-bold rounded-pill transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          )}
          onClick={() => switchBrand('namaste')}
          whileTap={{ scale: 0.95 }}
        >
          <span className={cn(
            "transition-colors duration-200",
            currentBrand === 'namaste' 
              ? "text-white" 
              : "text-gray-600 hover:text-gray-800"
          )}>
            Namaste India
          </span>
        </motion.button>
        
        {/* Active indicator background */}
        <motion.div
          className={cn(
            "absolute top-1 bottom-1 rounded-pill",
            currentBrand === 'konnichiwa' 
              ? "bg-primary-500 left-1 w-[calc(50%-0.25rem)]" 
              : "bg-primary-500 right-1 w-[calc(50%-0.25rem)]"
          )}
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
}