export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const bucketName =
  import.meta.env.VITE_BUCKET_NAME ||
  (() => {
    throw new Error(
      'VITE_BUCKET_NAME is not defined in the environment variables'
    )
  })()
