<template>
  <div
    class="relative leading-none"
    :class="flip ? 'rotate-180' : ''"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      class="block w-full"
      :class="heightClass"
    >
      <path
        :d="path"
        :fill="fill"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  fill?: string
  flip?: boolean
  size?: 'sm' | 'md'
}>(), {
  fill: 'var(--ui-bg)',
  flip: false,
  size: 'md'
})

const path = 'M0,58 C180,110 360,10 540,26 C720,42 900,104 1080,86 C1230,71 1350,30 1440,44 L1440,110 L0,110 Z'

const heightClass = computed(() => (props.size === 'sm' ? 'h-10 sm:h-14' : 'h-16 sm:h-24'))
</script>
