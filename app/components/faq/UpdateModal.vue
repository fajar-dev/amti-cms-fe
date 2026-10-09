<template>
  <UModal
    v-model:open="open"
    :title="$t('components.faq.updateModal.title')"
    :description="$t('components.faq.updateModal.description')"
  >
    <template #body>
      <UForm
        id="update-faq-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.faq.updateModal.questionLabel')"
          name="question"
          required
        >
          <UInput
            v-model="form.question"
            :placeholder="$t('components.faq.updateModal.questionPlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.faq.updateModal.answerLabel')"
          name="answer"
          required
        >
          <UTextarea
            v-model="form.answer"
            :placeholder="$t('components.faq.updateModal.answerPlaceholder')"
            :rows="4"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.faq.updateModal.orderLabel')"
          name="order"
        >
          <UInput
            v-model.number="form.order"
            type="number"
            :placeholder="$t('components.faq.updateModal.orderPlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.faq.updateModal.statusLabel')"
          name="isActive"
        >
          <div class="flex items-center gap-2">
            <USwitch v-model="form.isActive" />
            <span class="text-sm text-toned">{{ form.isActive ? $t('components.faq.updateModal.active') : $t('components.faq.updateModal.inactive') }}</span>
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
          form="update-faq-form"
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
import type { Faq, FaqPayload } from '~/types/faq'

const props = defineProps<{
  faq: Faq | null
}>()

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ updated: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const schema = z.object({
  question: z.string().min(1, t('components.faq.updateModal.questionRequired')).max(500, t('components.faq.updateModal.questionTooLong')),
  answer: z.string().min(1, t('components.faq.updateModal.answerRequired')),
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

watch(
  () => props.faq,
  (val) => {
    if (val) {
      form.question = val.question
      form.answer = val.answer
      form.order = val.order
      form.isActive = val.isActive
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  if (!props.faq) return
  isSubmitting.value = true
  try {
    const payload: Partial<FaqPayload> = {
      question: form.question,
      answer: form.answer,
      order: form.order,
      isActive: form.isActive
    }
    const response = await faqService.update(props.faq.id, payload)
    if (response.success) {
      toast.add({
        title: t('components.faq.updateModal.updatedSuccess'),
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
