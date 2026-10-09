<template>
  <UModal
    v-model:open="open"
    :title="$t('components.faq.addModal.title')"
    :description="$t('components.faq.addModal.description')"
  >
    <template #body>
      <UForm
        id="add-faq-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.faq.addModal.questionLabel')"
          name="question"
          required
        >
          <UInput
            v-model="form.question"
            :placeholder="$t('components.faq.addModal.questionPlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.faq.addModal.answerLabel')"
          name="answer"
          required
        >
          <UTextarea
            v-model="form.answer"
            :placeholder="$t('components.faq.addModal.answerPlaceholder')"
            :rows="4"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.faq.addModal.orderLabel')"
          name="order"
        >
          <UInput
            v-model.number="form.order"
            type="number"
            :placeholder="$t('components.faq.addModal.orderPlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.faq.addModal.statusLabel')"
          name="isActive"
        >
          <div class="flex items-center gap-2">
            <USwitch v-model="form.isActive" />
            <span class="text-sm text-toned">{{ form.isActive ? $t('components.faq.addModal.active') : $t('components.faq.addModal.inactive') }}</span>
          </div>
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
          form="add-faq-form"
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
import { faqService } from '~/services/faq-service'
import type { FaqPayload } from '~/types/faq'

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ created: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const schema = z.object({
  question: z.string().min(1, t('components.faq.addModal.questionRequired')).max(500, t('components.faq.addModal.questionTooLong')),
  answer: z.string().min(1, t('components.faq.addModal.answerRequired')),
  order: z.number().int().optional(),
  isActive: z.boolean()
})

const form = reactive<{
  question: string
  answer: string
  order: number
  isActive: boolean
}>({
  question: '',
  answer: '',
  order: 0,
  isActive: true
})

const resetForm = () => {
  form.question = ''
  form.answer = ''
  form.order = 0
  form.isActive = true
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const payload: FaqPayload = {
      question: form.question,
      answer: form.answer,
      order: form.order,
      isActive: form.isActive
    }
    const response = await faqService.create(payload)
    if (response.success) {
      toast.add({
        title: t('components.faq.addModal.createdSuccess'),
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
