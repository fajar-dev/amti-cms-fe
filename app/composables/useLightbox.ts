export const useLightbox = () => {
  const lightboxOpen = useState('lightbox-open', () => false)
  const lightboxImage = useState('lightbox-image', () => '')
  const lightboxAlt = useState('lightbox-alt', () => '')

  function openLightbox(url: string, alt = '') {
    if (!url) return
    lightboxImage.value = url
    lightboxAlt.value = alt
    lightboxOpen.value = true
  }

  function closeLightbox() {
    lightboxOpen.value = false
  }

  return { lightboxOpen, lightboxImage, lightboxAlt, openLightbox, closeLightbox }
}
