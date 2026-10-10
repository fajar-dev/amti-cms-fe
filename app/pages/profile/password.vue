<template>
  <div class="p-6 space-y-6">
    <UForm
      :schema="passwordSchema"
      :state="formPassword"
      class="space-y-4"
      @submit="handlePasswordSubmit"
    >
      <UFormField
        v-if="authState.user?.hasPassword"
        name="oldPassword"
      >
        <template #label>
          <div class="flex flex-col gap-0.5">
            <span class="font-medium text-sm text-highlighted">{{ $t('pages.profile.password.currentPasswordLabel') }}</span>
            <span class="text-xs text-dimmed font-normal">{{ $t('pages.profile.password.currentPasswordHint') }}</span>
          </div>
        </template>
        <UInput
          v-model="formPassword.oldPassword"
          type="password"
          :placeholder="$t('pages.profile.password.currentPasswordPlaceholder')"
          class="w-full"
        />
      </UFormField>
      <UFormField
        :label="$t('pages.profile.password.newPasswordLabel')"
        name="newPassword"
        required
      >
        <UInput
          v-model="formPassword.newPassword"
          type="password"
          :placeholder="$t('pages.profile.password.newPasswordPlaceholder')"
          class="w-full"
        />
      </UFormField>
      <UFormField
        :label="$t('pages.profile.password.confirmPasswordLabel')"
        name="confirmPassword"
        required
      >
        <UInput
          v-model="formPassword.confirmPassword"
          type="password"
          :placeholder="$t('pages.profile.password.confirmPasswordPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <div class="flex justify-end pt-3 border-t border-default">
        <UButton
          type="submit"
          color="primary"
          :loading="isSavingPassword"
          icon="i-lucide-key-round"
        >
          {{ $t('pages.profile.password.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { z } from 'zod'
import type { UpdatePasswordPayload } from '~/types/profile'

const { state: authState, service: authService } = useAuth()
const toast = useToast()
const { t } = useI18n()

const isSavingPassword = ref(false)

const formPassword = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordSchema = z.object({
  oldPassword: z.string().optional().or(z.literal('')),
  newPassword: z.string().min(6, t('pages.profile.password.newPasswordMin')),
  confirmPassword: z.string().min(6, t('pages.profile.password.confirmPasswordMin'))
}).refine(
  data => data.confirmPassword === data.newPassword,
  { message: t('pages.profile.password.passwordMismatch'), path: ['confirmPassword'] }
)

const handlePasswordSubmit = async () => {
  isSavingPassword.value = true

  const payload: UpdatePasswordPayload = {
    newPassword: formPassword.newPassword
  }

  if (formPassword.oldPassword && formPassword.oldPassword.trim() !== '') {
    payload.oldPassword = formPassword.oldPassword
  }

  try {
    const response = await authService.updatePassword(payload)
    if (response.success) {
      toast.add({
        title: t('pages.profile.password.updatedSuccess'),
        icon: 'i-lucide-circle-check'
      })
      formPassword.oldPassword = ''
      formPassword.newPassword = ''
      formPassword.confirmPassword = ''
    }
  } finally {
    isSavingPassword.value = false
  }
}
</script>
