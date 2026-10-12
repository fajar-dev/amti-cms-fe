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
      <USkeleton class="h-10 w-full" />
    </div>

    <!-- Social Form -->
    <UForm
      v-else
      :schema="socialSchema"
      :state="form"
      class="space-y-6"
      @submit="handleSave"
    >
      <div class="space-y-4">
        <div class="border-b border-default pb-3">
          <h3 class="text-base font-semibold text-highlighted">
            {{ $t('pages.settings.social.title') }}
          </h3>
          <p class="text-sm text-muted mt-0.5">
            {{ $t('pages.settings.social.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField
            :label="$t('pages.settings.social.facebook')"
            name="facebook"
          >
            <UInput
              v-model="form.facebook"
              :placeholder="$t('pages.settings.social.facebookPlaceholder')"
              icon="i-lucide-facebook"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.social.instagram')"
            name="instagram"
          >
            <UInput
              v-model="form.instagram"
              :placeholder="$t('pages.settings.social.instagramPlaceholder')"
              icon="i-lucide-instagram"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.social.tiktok')"
            name="tiktok"
          >
            <UInput
              v-model="form.tiktok"
              :placeholder="$t('pages.settings.social.tiktokPlaceholder')"
              icon="i-lucide-music-2"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.social.linkedin')"
            name="linkedin"
          >
            <UInput
              v-model="form.linkedin"
              :placeholder="$t('pages.settings.social.linkedinPlaceholder')"
              icon="i-lucide-linkedin"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.social.twitter')"
            name="twitter"
          >
            <UInput
              v-model="form.twitter"
              :placeholder="$t('pages.settings.social.twitterPlaceholder')"
              icon="i-lucide-twitter"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.social.youtube')"
            name="youtube"
          >
            <UInput
              v-model="form.youtube"
              :placeholder="$t('pages.settings.social.youtubePlaceholder')"
              icon="i-lucide-youtube"
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
          {{ $t('pages.settings.social.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { z } from 'zod'
import { settingService } from '~/services/setting-service'
import type { SettingSocialPayload } from '~/types/setting'

const { t } = useI18n()
const toast = useToast()
const { can } = usePermission()

const canUpdate = computed(() => can('settings.social.update') || can('settings.update'))

const isLoading = ref(true)
const isSaving = ref(false)

interface FormState {
  facebook: string
  instagram: string
  tiktok: string
  linkedin: string
  twitter: string
  youtube: string
}

const form = reactive<FormState>({
  facebook: '',
  instagram: '',
  tiktok: '',
  linkedin: '',
  twitter: '',
  youtube: ''
})

const socialSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional()
})

const fetchSettings = async () => {
  isLoading.value = true
  try {
    const response = await settingService.get()
    if (response.success && response.data) {
      const data = response.data
      form.facebook = data.facebook || ''
      form.instagram = data.instagram || ''
      form.tiktok = data.tiktok || ''
      form.linkedin = data.linkedin || ''
      form.twitter = data.twitter || ''
      form.youtube = data.youtube || ''
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
    const payload: SettingSocialPayload = {
      facebook: form.facebook?.trim() || null,
      instagram: form.instagram?.trim() || null,
      tiktok: form.tiktok?.trim() || null,
      linkedin: form.linkedin?.trim() || null,
      twitter: form.twitter?.trim() || null,
      youtube: form.youtube?.trim() || null
    }

    const response = await settingService.updateSocial(payload)
    if (response.success) {
      toast.add({
        title: t('pages.settings.social.updatedSuccess'),
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
