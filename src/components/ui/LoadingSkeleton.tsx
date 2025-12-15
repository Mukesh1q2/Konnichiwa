import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
}

export function LoadingSkeleton({ 
  className = '', 
  count = 1, 
  height = 'h-4', 
  width = 'w-full' 
}: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
        />
      ))}
    </>
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-2">
        <LoadingSkeleton height="h-6" />
        <LoadingSkeleton height="h-4" />
        <LoadingSkeleton height="h-4" width="w-3/4" />
      </div>
      <div className="mt-4 flex space-x-2">
        <LoadingSkeleton height="h-8" width="w-20" />
        <LoadingSkeleton height="h-8" width="w-24" />
      </div>
    </div>
  );
}

// Event card skeleton
export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <LoadingSkeleton height="h-6" />
        <LoadingSkeleton height="h-4" className="mt-2" />
        <LoadingSkeleton height="h-4" width="w-2/3" className="mt-2" />
        <div className="mt-4 flex items-center space-x-4">
          <LoadingSkeleton height="h-4" width="w-20" />
          <LoadingSkeleton height="h-4" width="w-16" />
        </div>
      </div>
    </div>
  );
}

// Profile skeleton
export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="flex items-center space-x-6 mb-8">
        <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <LoadingSkeleton height="h-6" width="w-48" />
          <LoadingSkeleton height="h-4" width="w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <LoadingSkeleton height="h-8" />
          <LoadingSkeleton height="h-12" />
          <LoadingSkeleton height="h-12" />
          <LoadingSkeleton height="h-12" />
        </div>
        <div className="space-y-4">
          <LoadingSkeleton height="h-8" />
          <LoadingSkeleton height="h-32" />
          <LoadingSkeleton height="h-32" />
        </div>
      </div>
    </div>
  );
}
