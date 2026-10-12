<template>
  <div
    class="flex items-center gap-1 cursor-pointer select-none hover:text-primary transition-colors"
    :class="justifyClass"
    @click="$emit('toggle')"
  >
    <span>{{ label() }}</span>
    <div class="flex flex-col -space-y-1.5">
      <UIcon
        name="i-lucide-chevron-up"
        class="size-3"
        :class="upClass"
      />
      <UIcon
        name="i-lucide-chevron-down"
        class="size-3"
        :class="downClass"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: () => string
  active?: boolean
  order?: 'ASC' | 'DESC'
  align?: 'start' | 'center' | 'end'
}>()

defineEmits<{ toggle: [] }>()

const justifyClass = computed(() => {
  if (props.align === 'center') return 'justify-center'
  if (props.align === 'end') return 'justify-end'
  return ''
})

const upClass = computed(() => (props.active && props.order === 'ASC' ? 'text-primary' : 'text-dimmed'))
const downClass = computed(() => (props.active && props.order === 'DESC' ? 'text-primary' : 'text-dimmed'))
</script>
