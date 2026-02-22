import imageCompression from 'browser-image-compression'

const defaultOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/webp'
}

/**
 * Compress an image file before upload.
 * Converts to WebP, caps at 1MB and 1920px max dimension.
 * Returns a new File object with a .webp extension.
 */
export async function compressImage(file, options = {}) {
  const opts = { ...defaultOptions, ...options }
  const compressed = await imageCompression(file, opts)

  // Ensure filename ends with .webp
  const baseName = file.name.replace(/\.[^/.]+$/, '')
  return new File([compressed], `${baseName}.webp`, {
    type: 'image/webp'
  })
}
