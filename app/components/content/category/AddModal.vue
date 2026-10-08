<template>
  <UModal
    v-model:open="open"
    :title="$t('components.category.addModal.title')"
    :description="$t('components.category.addModal.description')"
  >
    <template #body>
      <UForm
        id="add-category-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.category.addModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.category.addModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.category.addModal.descriptionLabel')"
          name="description"
        >
          <UTextarea
            v-model="form.description"
            :placeholder="$t('components.category.addModal.descriptionPlaceholder')"
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
          form="add-category-form"
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
import type { CategoryPayload } from '~/types/content'

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ created: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const schema = z.object({
  name: z.string().min(1, t('components.category.addModal.nameRequired')),
  description: z.string().nullable().optional()
})

const form = reactive<CategoryPayload>({
  name: '',
  description: ''
})

const resetForm = () => {
  form.name = ''
  form.description = ''
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const response = await categoryService.create(form)
    if (response.success) {
      toast.add({
        title: t('components.category.addModal.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('created')
      open.value = false
      resetForm()
    }
  } finally {
    isSubmitting.value = false
  }
}

watch(open, (val) => {
  if (!val) resetForm()
})
</script>
