<template>
  <div
    class="w-full overflow-hidden leading-none pointer-events-none select-none"
    :class="[direction === 'bottom' ? 'rotate-180' : '']"
  >
    <!-- Wave style -->
    <svg
      v-if="type === 'wave'"
      class="relative block w-full"
      :class="heightClass"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        :fill="fillColor"
      />
    </svg>

    <!-- Curve / Arc style -->
    <svg
      v-else-if="type === 'curve'"
      class="relative block w-full"
      :class="heightClass"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
        :fill="fillColor"
      />
    </svg>

    <!-- Slant style -->
    <svg
      v-else
      class="relative block w-full"
      :class="heightClass"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,80 L1440,0 L1440,80 Z"
        :fill="fillColor"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'wave' | 'curve' | 'slant'
    direction?: 'top' | 'bottom'
    fill?: string
    height?: string
  }>(),
  {
    type: 'wave',
    direction: 'top',
    fill: '#ffffff',
    height: 'h-10 sm:h-16 md:h-20'
  }
)

const fillColor = computed(() => props.fill)
const heightClass = computed(() => props.height)
</script>
