import axios from 'axios'

interface ApiValidationError {
  field?: string
  message?: string
}

interface ApiErrorData {
  message?: string
  errors?: ApiValidationError[]
}

export const handleServiceError = (error: unknown): never => {
  if (axios.isCancel(error)) {
    throw error
  }

  const toast = useToast()
  let responseData: ApiErrorData | undefined
  let status: number | undefined
  let fallbackMessage = ''

  if (axios.isAxiosError<ApiErrorData>(error)) {
    responseData = error.response?.data
    status = error.response?.status
    fallbackMessage = error.message
  } else if (error instanceof Error) {
    fallbackMessage = error.message
  }

  const title = responseData?.message || 'Error'
  let description = ''

  if (status === 422 && responseData?.errors && Array.isArray(responseData.errors)) {
    description = responseData.errors.map(err => err.message).filter(Boolean).join(', ')
  } else if (responseData?.message && responseData.message !== title) {
    description = responseData.message
  } else if (fallbackMessage && fallbackMessage !== title) {
    description = fallbackMessage
  }

  toast.add({
    title,
    description: description || undefined,
    icon: 'i-lucide-circle-x',
    color: 'error'
  })

  throw error
}
