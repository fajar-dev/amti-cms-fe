<template>
  <UModal
    v-model:open="open"
    :title="$t('components.category.updateModal.title')"
    :description="$t('components.category.updateModal.description')"
  >
    <template #body>
      <UForm
        id="update-category-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.category.updateModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.category.updateModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.category.updateModal.descriptionLabel')"
          name="description"
        >
          <UTextarea
            v-model="form.description"
            :placeholder="$t('components.category.updateModal.descriptionPlaceholder')"
            :rows="3"
            class="w-full"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-2 w-full">
        <UButton
          :label="$t('common.cancel')"
          color="neutral"
          variant="soft"
          @click="() => { open = false }"
        />
        <UButton
          type="submit"
          form="update-category-form"
          color="primary"
          :loading="isSubmitting"
        >
          {{ $t('common.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { categoryService } from '~/services/category-service'
import type { Category, CategoryPayload } from '~/types/content'

const props = defineProps<{
  category: Category | null
}>()

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ updated: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const schema = z.object({
  name: z.string().min(1, t('components.category.updateModal.nameRequired')),
  description: z.string().nullable().optional()
})

const form = reactive<CategoryPayload>({
  name: '',
  description: ''
})

watch(
  () => props.category,
  (val) => {
    if (val) {
      form.name = val.name
      form.description = val.description || ''
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  if (!props.category) return
  isSubmitting.value = true
  try {
    const response = await categoryService.update(props.category.id, form)
    if (response.success) {
      toast.add({
        title: t('components.category.updateModal.updatedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('updated')
      open.value = false
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
