'use client'

import { ReactNode, Suspense } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

export default function LazySection({
  children,
  fallback = (
    <div className="w-full h-96 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-400">Cargando...</div>
    </div>
  ),
  className = ""
}: LazySectionProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  )
}