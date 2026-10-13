import type { ApiResponse } from '../types/api'

type UploadResponse = ApiResponse<{ path: string }>

interface UseImageUploadOptions {
  upload: (file: File) => Promise<UploadResponse>
  onUploaded: (path: string) => void
  successMessage: string
  errorMessage: string
}

export function useImageUpload(options: UseImageUploadOptions) {
  const toast = useToast()

  const isUploading = ref(false)
  const previewUrl = ref<string | null>(null)

  const clearPreview = () => {
    revokePreviewUrl(previewUrl.value)
    previewUrl.value = null
  }

  const setPreviewFromUrl = (url: string | null | undefined) => {
    clearPreview()
    previewUrl.value = url ?? null
  }

  const showErrorToast = () => {
    toast.add({
      title: options.errorMessage,
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  }

  const rollback = (previousUrl: string | null) => {
    clearPreview()
    previewUrl.value = previousUrl
    showErrorToast()
  }

  const uploadFile = async (file: File | null | undefined): Promise<boolean> => {
    if (!file) return false

    const previousUrl = previewUrl.value

    clearPreview()
    previewUrl.value = createPreviewUrl(file)
    isUploading.value = true

    try {
      const response = await options.upload(file)

      if (response.success && response.data?.path) {
        options.onUploaded(response.data.path)
        toast.add({
          title: options.successMessage,
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
        return true
      }

      rollback(previousUrl)
      return false
    } catch {
      rollback(previousUrl)
      return false
    } finally {
      isUploading.value = false
    }
  }

  onBeforeUnmount(clearPreview)

  return {
    isUploading,
    previewUrl,
    uploadFile,
    clearPreview,
    setPreviewFromUrl
  }
}
