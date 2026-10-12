<template>
  <div class="p-6 space-y-6">
    <!-- Loading Skeleton -->
    <div
      v-if="isLoading"
      class="space-y-6"
    >
      <USkeleton class="h-6 w-48" />
      <USkeleton class="h-10 w-full" />
      <USkeleton class="h-10 w-full" />
      <USkeleton class="h-24 w-full" />
    </div>

    <!-- Contact Form -->
    <UForm
      v-else
      :schema="contactSchema"
      :state="form"
      class="space-y-6"
      @submit="handleSave"
    >
      <div class="space-y-4">
        <div class="border-b border-default pb-3">
          <h3 class="text-base font-semibold text-highlighted">
            {{ $t('pages.settings.contact.title') }}
          </h3>
          <p class="text-sm text-muted mt-0.5">
            {{ $t('pages.settings.contact.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField
            :label="$t('pages.settings.contact.phone')"
            name="phone"
          >
            <UInput
              v-model="form.phone"
              :placeholder="$t('pages.settings.contact.phonePlaceholder')"
              icon="i-lucide-phone"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.contact.email')"
            name="email"
          >
            <UInput
              v-model="form.email"
              type="email"
              :placeholder="$t('pages.settings.contact.emailPlaceholder')"
              icon="i-lucide-mail"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.contact.address')"
            name="address"
            class="sm:col-span-2"
          >
            <UTextarea
              v-model="form.address"
              :placeholder="$t('pages.settings.contact.addressPlaceholder')"
              :rows="4"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>
        </div>
      </div>

      <!-- Action Button -->
      <div
        v-if="canUpdate"
        class="flex justify-end pt-3 border-t border-default"
      >
        <UButton
          type="submit"
          color="primary"
          :loading="isSaving"
          icon="i-lucide-save"
        >
          {{ $t('pages.settings.contact.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { z } from 'zod'
import { settingService } from '~/services/setting-service'
import type { SettingContactPayload } from '~/types/setting'

const { t } = useI18n()
const toast = useToast()
const { can } = usePermission()

const canUpdate = computed(() => can('settings.contact.update') || can('settings.update'))

const isLoading = ref(true)
const isSaving = ref(false)

interface FormState {
  phone: string
  email: string
  address: string
}

const form = reactive<FormState>({
  phone: '',
  email: '',
  address: ''
})

const contactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().optional()
})

const fetchSettings = async () => {
  isLoading.value = true
  try {
    const response = await settingService.get()
    if (response.success && response.data) {
      const data = response.data
      form.phone = data.phone || ''
      form.email = data.email || ''
      form.address = data.address || ''
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSave = async () => {
  isSaving.value = true
  try {
    const payload: SettingContactPayload = {
      phone: form.phone?.trim() || null,
      email: form.email?.trim() || null,
      address: form.address?.trim() || null
    }

    const response = await settingService.updateContact(payload)
    if (response.success) {
      toast.add({
        title: t('pages.settings.contact.updatedSuccess'),
        icon: 'i-lucide-check-circle',
        color: 'success'
      })
    } else {
      toast.add({
        title: response.message || t('common.error'),
        icon: 'i-lucide-circle-x',
        color: 'error'
      })
    }
  } catch {
    toast.add({
      title: t('common.error'),
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script>
