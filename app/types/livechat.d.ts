export type ChatTicketStatus = 'WAITING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
export type ChatSenderType = 'VISITOR' | 'USER' | 'SYSTEM'

export interface ChatAssignedUser {
  id: number
  name: string
  email: string
  avatarUrl?: string | null
}

export interface ChatSession {
  id: number
  ticketNumber: string
  sessionToken?: string
  visitorName: string
  visitorEmail: string
  visitorPhone: string
  visitorCompany: string
  status: ChatTicketStatus
  assignedToId?: number | null
  assignedTo?: ChatAssignedUser | null
  assignedAt?: string | null
  lastMessageAt: string
  unreadCountUser: number
  unreadCountVisitor: number
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: number
  sessionId: number
  senderType: ChatSenderType
  senderId?: number | null
  senderName: string
  message?: string | null
  mediaUrl?: string | null
  mediaType?: string | null
  mediaName?: string | null
  mediaSize?: number | null
  isRead: boolean
  createdAt: string
}

export interface StartChatPayload {
  visitorName: string
  visitorEmail: string
  visitorPhone: string
  visitorCompany: string
  initialMessage?: string
  mediaUrl?: string
  mediaType?: string
  mediaName?: string
  mediaSize?: number
}

export interface SendMessagePayload {
  message?: string | null
  mediaUrl?: string | null
  mediaType?: string | null
  mediaName?: string | null
  mediaSize?: number | null
}

export interface UploadedMedia {
  path: string
  url: string
  name: string
  type: string
  size: number
}

export interface TicketStats {
  waiting: number
  inProgress: number
  resolved: number
  closed: number
}
