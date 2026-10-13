<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      v-if="pattern !== 'none'"
      class="absolute inset-0 bg-repeat"
      :style="patternStyle"
    />

    <img
      v-if="contour"
      src="/amti/patterns/contour.svg"
      alt=""
      class="contour-soft absolute w-full max-w-2xl select-none"
      :class="contourPosition"
    >

    <div
      class="absolute -top-40 -right-24 size-96 rounded-full blur-3xl animate-amti-drift"
      :class="dark ? 'bg-amber-500/10' : 'bg-primary/10'"
    />
    <div
      class="absolute -bottom-32 -left-20 size-80 rounded-full blur-3xl animate-amti-drift-slow"
      :class="dark ? 'bg-primary/30' : 'bg-amber-500/10'"
    />

    <div
      v-if="grain"
      class="absolute inset-0 opacity-5 mix-blend-soft-light"
      :style="{ backgroundImage: 'url(/amti/patterns/grain.svg)' }"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  dark?: boolean
  pattern?: 'grid' | 'lines' | 'none'
  contour?: boolean
  grain?: boolean
}>(), {
  dark: false,
  pattern: 'grid',
  contour: false,
  grain: false
})

const patternStyle = computed(() => ({
  backgroundImage: `url(/amti/patterns/${props.pattern}.svg)`,
  opacity: props.dark ? 0.35 : 0.8
}))

const contourPosition = computed(() =>
  props.dark ? 'top-1/2 -left-24 -translate-y-1/2' : 'bottom-0 -left-28'
)
</script>

<style scoped>
@keyframes amti-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-1.5rem, 1.5rem, 0) scale(1.08); }
}

@keyframes amti-drift-slow {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
  50% { transform: translate3d(1.5rem, -1rem, 0) scale(1); }
}

.animate-amti-drift {
  animation: amti-drift 22s ease-in-out infinite;
}

.animate-amti-drift-slow {
  animation: amti-drift-slow 28s ease-in-out infinite;
}

div {
  pointer-events: none;
}

.contour-soft {
  opacity: 0.5;
  mask-image: radial-gradient(65% 65% at 40% 60%, black 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(65% 65% at 40% 60%, black 0%, transparent 100%);
}

@media (prefers-reduced-motion: reduce) {
  .animate-amti-drift,
  .animate-amti-drift-slow {
    animation: none;
  }
}
</style>
