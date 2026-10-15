import { liveChatService } from '~/services/livechat-service'
import type { ChatSession, ChatMessage, UploadedMedia, TicketStats } from '~/types/livechat'

export function useStaffChat() {
  const { t, locale } = useI18n()
  const toast = useToast()

  const activeTab = ref<string>('waiting')
  const searchQuery = ref('')
  const ticketsContainer = ref<HTMLDivElement | null>(null)
  const isLoadingMore = ref(false)
  const totalTickets = ref(0)
  const perPage = 20
  let loadedPages = 1
  let searchTimeout: ReturnType<typeof setTimeout> | undefined
  const tickets = ref<ChatSession[]>([])
  const selectedTicketId = ref<number | null>(null)
  const messages = ref<ChatMessage[]>([])
  const replyMessage = ref('')

  const isLoadingTickets = ref(false)
  const isClaiming = ref(false)
  const isSending = ref(false)
  const isResolving = ref(false)
  const isUploading = ref(false)

  const pendingAttachment = ref<UploadedMedia | null>(null)
  const messagesContainer = ref<HTMLDivElement | null>(null)

  const stats = reactive<TicketStats>({
    waiting: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  })

  const { start: startPolling } = useChatPolling(async () => {
    await Promise.all([fetchTickets(true), fetchStats(), fetchMessages()])
  }, 3000)
  let ticketRequest = 0

  const tabItems = computed(() => [
    {
      label: t('pages.chat.tabWaiting'),
      value: 'waiting',
      badge: stats.waiting > 0 ? stats.waiting : undefined
    },
    {
      label: t('pages.chat.tabMine'),
      value: 'my_active'
    },
    {
      label: t('pages.chat.tabAll'),
      value: 'history'
    }
  ])

  const activeTicket = computed(() => {
    return tickets.value.find(t => t.id === selectedTicketId.value) || null
  })

  const filteredTickets = computed(() => tickets.value)

  async function handleFileSelected(file: File) {
    if (isUploading.value) return

    const ticketId = selectedTicketId.value
    try {
      isUploading.value = true
      const res = await liveChatService.staffUploadMedia(file)
      if (res.success && res.data && selectedTicketId.value === ticketId) {
        pendingAttachment.value = res.data
      }
    } finally {
      isUploading.value = false
    }
  }

  async function fetchStats() {
    const res = await liveChatService.getStats()
    if (res.success && res.data) {
      stats.waiting = res.data.waiting
      stats.inProgress = res.data.inProgress
      stats.resolved = res.data.resolved
      stats.closed = res.data.closed
    }
  }

  async function fetchTickets(silent = false, append = false) {
    if (isLoadingTickets.value || isLoadingMore.value) return
    const requestId = ++ticketRequest
    if (append) isLoadingMore.value = true
    else if (!silent) isLoadingTickets.value = true

    const nextPage = loadedPages + 1
    const pages = append ? [nextPage] : Array.from({ length: loadedPages }, (_, index) => index + 1)
    const status = activeTab.value === 'waiting' ? 'WAITING' : activeTab.value === 'my_active' ? 'IN_PROGRESS' : undefined
    try {
      // Refresh all loaded pages so polling preserves the expanded queue.
      const responses = await Promise.all(pages.map(page => liveChatService.getTickets(
        page, perPage, status, searchQuery.value, activeTab.value === 'my_active'
      )))
      if (requestId !== ticketRequest) return
      const first = responses[0]
      if (!first || responses.some(response => !response.success)) return
      const received = responses.flatMap(response => response.data)
      const merged = append ? [...tickets.value, ...received] : received
      tickets.value = [...new Map(merged.map(ticket => [ticket.id, ticket])).values()]
      totalTickets.value = first.meta?.total ?? tickets.value.length
      if (append) loadedPages = nextPage
      if (!tickets.value.length) {
        selectedTicketId.value = null
        messages.value = []
      } else if (!tickets.value.some(ticket => ticket.id === selectedTicketId.value) && tickets.value[0]) {
        await selectTicket(tickets.value[0].id)
      }
    } finally {
      if (requestId === ticketRequest) {
        isLoadingTickets.value = false
        isLoadingMore.value = false
      }
    }
    await nextTick()
    if (requestId === ticketRequest) handleTicketScroll()
  }

  function handleTicketScroll() {
    const container = ticketsContainer.value
    if (!container || container.clientHeight === 0 || loadedPages * perPage >= totalTickets.value) return
    if (container.scrollHeight - container.scrollTop - container.clientHeight <= 120) {
      void fetchTickets(true, true).catch(() => {})
    }
  }

  function resetTickets() {
    ticketRequest += 1
    loadedPages = 1
    isLoadingTickets.value = false
    isLoadingMore.value = false
    tickets.value = []
    totalTickets.value = 0
    if (ticketsContainer.value) ticketsContainer.value.scrollTop = 0
    void fetchTickets().catch(() => {})
  }

  async function selectTicket(id: number) {
    selectedTicketId.value = id
    messages.value = []
    pendingAttachment.value = null
    replyMessage.value = ''
    await fetchMessages()
  }

  async function fetchMessages() {
    if (isSending.value) return
    if (!selectedTicketId.value) return
    const ticketId = selectedTicketId.value
    const res = await liveChatService.getStaffMessages(ticketId)
    if (selectedTicketId.value !== ticketId) return
    if (res.success && res.data) {
      const lastMessageId = messages.value.at(-1)?.id
      messages.value = res.data.messages
      if (messages.value.at(-1)?.id !== lastMessageId) scrollToBottom()
    }
  }

  async function claimTicket(ticketId: number) {
    isClaiming.value = true
    try {
      const res = await liveChatService.claimTicket(ticketId)
      if (res.success && res.data) {
        selectedTicketId.value = res.data.id
        activeTab.value = 'my_active'
        toast.add({
          title: t('pages.chat.claimThisTicket'),
          color: 'success'
        })
        await Promise.all([fetchTickets(true), fetchStats(), fetchMessages()])
      }
    } finally {
      isClaiming.value = false
    }
  }

  async function handleSendReply() {
    if (isSending.value) return
    const text = replyMessage.value.trim()
    const attachment = pendingAttachment.value
    if (!text && !attachment) return
    if (!selectedTicketId.value) return

    const ticketId = selectedTicketId.value
    isSending.value = true
    try {
      const res = await liveChatService.staffSendMessage(ticketId, {
        message: text || null,
        mediaUrl: attachment?.path || null,
        mediaType: attachment?.type || null,
        mediaName: attachment?.name || null,
        mediaSize: attachment?.size || null
      })

      if (res.success && res.data && selectedTicketId.value === ticketId) {
        messages.value.push(res.data)
        replyMessage.value = ''
        pendingAttachment.value = null
        scrollToBottom()
      }
    } finally {
      isSending.value = false
    }
  }

  async function resolveTicket(ticketId: number) {
    isResolving.value = true
    try {
      const res = await liveChatService.resolveTicket(ticketId)
      if (res.success && res.data) {
        toast.add({
          title: t('pages.chat.resolveTicket'),
          color: 'success'
        })
        await Promise.all([fetchTickets(true), fetchStats(), fetchMessages()])
      }
    } finally {
      isResolving.value = false
    }
  }

  function scrollToBottom() {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }

  function cleanPhone(phone: string) {
    return phone.replace(/[^0-9]/g, '')
  }

  watch(activeTab, () => {
    clearTimeout(searchTimeout)
    resetTickets()
    startPolling()
  })

  watch(searchQuery, () => {
    // Invalidate requests from the previous search immediately.
    ticketRequest += 1
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(resetTickets, 300)
  })

  onBeforeUnmount(() => {
    ticketRequest += 1
    clearTimeout(searchTimeout)
  })

  onMounted(async () => {
    await Promise.all([fetchTickets(), fetchStats()])
    startPolling()
  })

  return {
    ticketsContainer,
    isLoadingMore,
    handleTicketScroll,
    t,
    locale,
    activeTab,
    searchQuery,
    selectedTicketId,
    messages,
    replyMessage,
    isLoadingTickets,
    isClaiming,
    isSending,
    isResolving,
    isUploading,
    pendingAttachment,
    messagesContainer,
    stats,
    tabItems,
    activeTicket,
    filteredTickets,
    handleFileSelected,
    selectTicket,
    claimTicket,
    handleSendReply,
    resolveTicket,
    cleanPhone
  }
}
