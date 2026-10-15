import { z } from 'zod'
import { liveChatService } from '~/services/livechat-service'
import type { ChatSession, ChatMessage, UploadedMedia } from '~/types/livechat'

export function useVisitorChat() {
  const { t, locale } = useI18n()

  const STORAGE_KEY = 'amti_livechat_token'

  const isOpen = ref(false)
  const isStarting = ref(false)
  const isSending = ref(false)
  const isUploading = ref(false)
  const startError = ref('')

  const session = ref<ChatSession | null>(null)
  const messages = ref<ChatMessage[]>([])
  const inputMessage = ref('')
  const unreadBadge = ref(0)

  const pendingAttachment = ref<UploadedMedia | null>(null)
  const messagesContainer = ref<HTMLDivElement | null>(null)

  const startForm = reactive({
    visitorName: '',
    visitorPhone: '',
    visitorEmail: '',
    visitorCompany: ''
  })

  const schema = z.object({
    visitorName: z.string().trim().min(2, t('site.chat.nameRequired')).max(150),
    visitorPhone: z.string().trim().min(6, t('site.chat.phoneRequired')).max(50),
    visitorEmail: z.string().min(1, t('site.chat.emailRequired')).email(t('site.chat.emailInvalid')).max(150),
    visitorCompany: z.string().trim().min(2, t('site.chat.companyRequired')).max(150)
  })

  const { start: startPolling, stop: stopPolling } = useChatPolling(async () => {
    const token = session.value?.sessionToken
    if (!token) return
    if (isOpen.value) {
      await fetchMessages()
    } else {
      const response = await liveChatService.getSession(token)
      if (session.value?.sessionToken !== token || !response.data) return
      session.value = response.data
      unreadBadge.value = response.data.unreadCountVisitor
    }
  }, 2500)

  async function handleFileSelected(file: File) {
    if (isUploading.value) return

    if (!session.value?.sessionToken) {
      return
    }

    const token = session.value.sessionToken
    try {
      isUploading.value = true
      const res = await liveChatService.visitorUploadMedia(token, file)
      if (res.success && res.data && session.value?.sessionToken === token) {
        pendingAttachment.value = res.data
      }
    } finally {
      isUploading.value = false
    }
  }

  async function handleStartChat() {
    if (isStarting.value) return
    startError.value = ''
    isStarting.value = true

    try {
      const res = await liveChatService.startChat({
        visitorName: startForm.visitorName.trim(),
        visitorPhone: startForm.visitorPhone.trim(),
        visitorEmail: startForm.visitorEmail.trim(),
        visitorCompany: startForm.visitorCompany.trim()
      })

      if (res.success && res.data) {
        session.value = res.data.session
        if (res.data.session.sessionToken) {
          localStorage.setItem(STORAGE_KEY, res.data.session.sessionToken)
        }
        if (res.data.message) {
          messages.value = [res.data.message]
        } else {
          messages.value = []
        }
        startPolling()
        scrollToBottom()
      } else {
        startError.value = res.message || t('site.chat.startFailed')
      }
    } catch (err: unknown) {
      startError.value = err instanceof Error ? err.message : t('site.chat.startFailed')
    } finally {
      isStarting.value = false
    }
  }

  async function handleSendMessage() {
    if (isSending.value) return
    const text = inputMessage.value.trim()
    const attachment = pendingAttachment.value

    if (!text && !attachment) return
    if (!session.value?.sessionToken) return

    const token = session.value.sessionToken
    isSending.value = true
    try {
      const res = await liveChatService.visitorSendMessage(token, {
        message: text || null,
        mediaUrl: attachment?.path || null,
        mediaType: attachment?.type || null,
        mediaName: attachment?.name || null,
        mediaSize: attachment?.size || null
      })

      if (res.success && res.data && session.value?.sessionToken === token) {
        messages.value.push(res.data)
        inputMessage.value = ''
        pendingAttachment.value = null
        scrollToBottom()
      }
    } finally {
      isSending.value = false
    }
  }

  async function fetchMessages() {
    if (isSending.value) return
    if (!session.value?.sessionToken) return

    const token = session.value.sessionToken
    const res = await liveChatService.getVisitorMessages(token)
    if (session.value?.sessionToken !== token) return
    if (res.success && res.data) {
      session.value = res.data.session
      const previousId = messages.value.at(-1)?.id
      messages.value = res.data.messages

      if (messages.value.at(-1)?.id !== previousId) {
        scrollToBottom()
      }
    }
  }

  function scrollToBottom() {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }

  async function endChat() {
    if (!session.value?.sessionToken) return
    await liveChatService.visitorCloseChat(session.value.sessionToken)
    if (session.value) session.value.status = 'CLOSED'
    stopPolling()
  }

  function resetAndStartNew() {
    stopPolling()
    localStorage.removeItem(STORAGE_KEY)
    session.value = null
    messages.value = []
    pendingAttachment.value = null
    inputMessage.value = ''
    unreadBadge.value = 0
  }

  function toggleChat() {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      unreadBadge.value = 0
      scrollToBottom()
      if (session.value?.sessionToken) {
        void fetchMessages().catch(() => {})
        startPolling()
      }
    }
  }

  onMounted(async () => {
    const savedToken = localStorage.getItem(STORAGE_KEY)
    if (savedToken) {
      const res = await liveChatService.getSession(savedToken)
      if (res.success && res.data && res.data.status !== 'CLOSED') {
        session.value = res.data
        unreadBadge.value = res.data.unreadCountVisitor
        startPolling()
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  })

  onUnmounted(() => {
    stopPolling()
  })

  return {
    locale,
    isOpen,
    isStarting,
    isSending,
    isUploading,
    startError,
    session,
    messages,
    inputMessage,
    unreadBadge,
    pendingAttachment,
    messagesContainer,
    startForm,
    schema,
    handleFileSelected,
    handleStartChat,
    handleSendMessage,
    endChat,
    resetAndStartNew,
    toggleChat
  }
}
