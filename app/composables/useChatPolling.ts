/** Poll serially; a failed request stops the loop until the user retries. */
export function useChatPolling(refresh: () => Promise<void>, delay: number) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let generation = 0

  function stop() {
    generation += 1
    clearTimeout(timer)
  }

  function start() {
    stop()
    const current = generation
    async function tick() {
      try {
        await refresh()
      } catch {
        // API services already display the error. Avoid repeated error toasts.
        return
      }
      if (current === generation) timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, delay)
  }

  onBeforeUnmount(stop)
  return { start, stop }
}
