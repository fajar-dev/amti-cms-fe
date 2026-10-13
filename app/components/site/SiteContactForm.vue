<template>
  <UForm
    v-if="!sent"
    :schema="schema"
    :state="form"
    class="space-y-5"
    @submit="handleSubmit"
  >
    <div
      class="hidden"
      aria-hidden="true"
    >
      <label for="contact-website">Website</label>
      <input
        id="contact-website"
        v-model="trap"
        type="text"
        tabindex="-1"
        autocomplete="off"
      >
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <UFormField
        :label="$t('site.contact.name')"
        name="name"
        required
      >
        <UInput
          v-model="form.name"
          :placeholder="$t('site.contact.namePlaceholder')"
          autocomplete="name"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('site.contact.email')"
        name="email"
        required
      >
        <UInput
          v-model="form.email"
          type="email"
          :placeholder="$t('site.contact.emailPlaceholder')"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('site.contact.phone')"
        name="phone"
      >
        <UInput
          v-model="form.phone"
          type="tel"
          :placeholder="$t('site.contact.phonePlaceholder')"
          autocomplete="tel"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('site.contact.subject')"
        name="subject"
        required
      >
        <UInput
          v-model="form.subject"
          :placeholder="$t('site.contact.subjectPlaceholder')"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      :label="$t('site.contact.message')"
      name="message"
      required
    >
      <UTextarea
        v-model="form.message"
        :placeholder="$t('site.contact.messagePlaceholder')"
        :rows="5"
        class="w-full"
      />
    </UFormField>

    <UAlert
      v-if="errorMessage"
      color="error"
      variant="subtle"
      icon="i-lucide-circle-alert"
      :title="errorMessage"
    />

    <div class="flex flex-wrap items-center gap-4">
      <UButton
        type="submit"
        color="primary"
        size="xl"
        icon="i-lucide-send"
        class="rounded-full px-7 shadow-lg shadow-primary/20"
        :loading="isSubmitting"
        :label="$t('site.contact.submit')"
      />
      <p class="text-xs text-dimmed">
        {{ $t('site.contact.responseNote') }}
      </p>
    </div>
  </UForm>

  <div
    v-else
    class="rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center"
  >
    <span class="mx-auto flex size-14 items-center justify-center rounded-full bg-green-500/15 text-green-700">
      <UIcon
        name="i-lucide-mail-check"
        class="size-7"
      />
    </span>
    <h3 class="mt-5 text-lg font-semibold text-highlighted">
      {{ $t('site.contact.successTitle') }}
    </h3>
    <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
      {{ $t('site.contact.successBody') }}
    </p>
    <UButton
      color="neutral"
      variant="outline"
      class="mt-6"
      icon="i-lucide-rotate-ccw"
      :label="$t('site.contact.sendAnother')"
      @click="sent = false"
    />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { messageService } from '~/services/message-service'

const { t } = useI18n()

const isSubmitting = ref(false)
const sent = ref(false)
const errorMessage = ref('')
const trap = ref('')

interface ContactFormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const createEmptyForm = (): ContactFormState => ({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const form = reactive<ContactFormState>(createEmptyForm())

const schema = z.object({
  name: z.string().min(1, t('site.contact.nameRequired')).max(255),
  email: z.string().min(1, t('site.contact.emailRequired')).email(t('site.contact.emailInvalid')).max(255),
  phone: z.string().max(50).optional().nullable(),
  subject: z.string().min(1, t('site.contact.subjectRequired')).max(255),
  message: z.string().min(1, t('site.contact.messageRequired'))
})

const handleSubmit = async () => {
  errorMessage.value = ''

  if (trap.value.trim()) return

  isSubmitting.value = true
  try {
    const response = await messageService.create({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      subject: form.subject.trim(),
      message: form.message.trim()
    })

    if (response.success) {
      sent.value = true
      Object.assign(form, createEmptyForm())
    } else {
      errorMessage.value = response.message || t('site.contact.errorTitle')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
