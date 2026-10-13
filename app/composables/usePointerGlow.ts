export function usePointerGlow() {
  const glowEl = ref<HTMLElement | null>(null)

  let enabled = false
  let frame = 0
  let pendingX = 0
  let pendingY = 0

  function apply() {
    frame = 0
    const node = glowEl.value
    if (!node) return
    node.style.setProperty('--glow-x', `${pendingX}px`)
    node.style.setProperty('--glow-y', `${pendingY}px`)
  }

  function onPointerMove(event: PointerEvent) {
    const node = glowEl.value
    if (!enabled || !node || event.pointerType !== 'mouse') return

    const rect = node.getBoundingClientRect()
    pendingX = event.clientX - rect.left
    pendingY = event.clientY - rect.top

    if (!frame) frame = requestAnimationFrame(apply)
  }

  function onPointerEnter() {
    if (!enabled) return
    glowEl.value?.style.setProperty('--glow-opacity', '1')
  }

  function onPointerLeave() {
    glowEl.value?.style.setProperty('--glow-opacity', '0')
  }

  onMounted(() => {
    enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
  })

  return { glowEl, onPointerMove, onPointerEnter, onPointerLeave }
}
