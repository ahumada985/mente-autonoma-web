'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getOptimizedImageUrl } from '@/lib/cloudinary'

interface CloudinaryImageProps {
  publicId: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  placeholder?: 'blur' | 'empty'
}

export function CloudinaryImage({
  publicId,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  quality = 80,
  format = 'auto',
  placeholder = 'empty'
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const imageUrl = getOptimizedImageUrl(publicId, {
    width,
    height,
    quality,
    format
  })

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}>
        <span>Error al cargar la imagen</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg" />
      )}
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority={priority}
        placeholder={placeholder}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

// Componente para imágenes responsivas
export function ResponsiveCloudinaryImage({
  publicId,
  alt,
  className = '',
  priority = false,
  quality = 80
}: Omit<CloudinaryImageProps, 'width' | 'height'>) {
  return (
    <div className={className}>
      <CloudinaryImage
        publicId={publicId}
        alt={alt}
        width={800}
        height={600}
        priority={priority}
        quality={quality}
        className="w-full h-auto"
      />
    </div>
  )
}

