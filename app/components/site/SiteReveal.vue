<template>
  <div
    ref="el"
    :class="motionReady ? transitionClass : ''"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
}>(), {
  delay: 0
})

const el = ref<HTMLElement | null>(null)
const visible = ref(false)
const motionReady = ref(false)

const transitionClass = computed(() =>
  visible.value
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-6'
)

onMounted(() => {
  if (typeof window === 'undefined') return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }

  motionReady.value = true

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (!entry?.isIntersecting) return

    window.setTimeout(() => {
      visible.value = true
    }, props.delay)

    observer.disconnect()
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

  if (el.value) observer.observe(el.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  div {
    transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  }
}
</style>
