<template>
  <div class="relative">
    <span
      class="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-transparent to-amber-500/40"
      aria-hidden="true"
    />

    <div class="relative overflow-hidden rounded-3xl border border-default bg-default shadow-2xl shadow-blue-950/10">
      <slot />
    </div>

    <span
      v-if="corners"
      class="corner-mark left-0 top-0 rounded-tl-xl border-l-2 border-t-2"
      aria-hidden="true"
    />
    <span
      v-if="corners"
      class="corner-mark right-0 top-0 rounded-tr-xl border-r-2 border-t-2"
      aria-hidden="true"
    />
    <span
      v-if="corners"
      class="corner-mark bottom-0 left-0 rounded-bl-xl border-b-2 border-l-2"
      aria-hidden="true"
    />
    <span
      v-if="corners"
      class="corner-mark bottom-0 right-0 rounded-br-xl border-b-2 border-r-2"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  corners?: boolean
}>(), {
  corners: false
})
</script>

<style scoped>
.corner-mark {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: var(--ui-primary);
  opacity: 0.3;
  pointer-events: none;
}
</style>
