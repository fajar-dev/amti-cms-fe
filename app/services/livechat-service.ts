import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { ApiResponse } from '../types/api'
import type {
  ChatSession,
  ChatMessage,
  StartChatPayload,
  SendMessagePayload,
  UploadedMedia,
  TicketStats,
  ChatTicketStatus
} from '../types/livechat'

export class LiveChatService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  private visitorHeaders(token: string) {
    return { headers: { 'X-Session-Token': token } }
  }

  // ── Public / Visitor Operations ──────────────────────────────────────────

  async startChat(payload: StartChatPayload): Promise<ApiResponse<{ session: ChatSession, message: ChatMessage | null }>> {
    try {
      const response = await apiService.client.post<ApiResponse<{ session: ChatSession, message: ChatMessage | null }>>(
        '/public/livechat/start',
        payload
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getSession(token: string): Promise<ApiResponse<ChatSession>> {
    try {
      const response = await apiService.client.get<ApiResponse<ChatSession>>(
        '/public/livechat/session',
        this.visitorHeaders(token)
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getVisitorMessages(token: string): Promise<ApiResponse<{ session: ChatSession, messages: ChatMessage[] }>> {
    try {
      const response = await apiService.client.get<ApiResponse<{ session: ChatSession, messages: ChatMessage[] }>>(
        '/public/livechat/messages',
        this.visitorHeaders(token)
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async visitorSendMessage(token: string, payload: SendMessagePayload): Promise<ApiResponse<ChatMessage>> {
    try {
      const response = await apiService.client.post<ApiResponse<ChatMessage>>(
        '/public/livechat/messages',
        payload,
        this.visitorHeaders(token)
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async visitorUploadMedia(token: string, file: File): Promise<ApiResponse<UploadedMedia>> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiService.client.post<ApiResponse<UploadedMedia>>(
        '/public/livechat/upload',
        formData,
        {
          headers: {
            'X-Session-Token': token,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async visitorCloseChat(token: string): Promise<ApiResponse<ChatSession>> {
    try {
      const response = await apiService.client.post<ApiResponse<ChatSession>>(
        '/public/livechat/close',
        {},
        this.visitorHeaders(token)
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  // ── Staff / CMS Operations ─────────────────────────────────────────────

  async getTickets(
    page = 1,
    perPage = 20,
    status?: ChatTicketStatus,
    search = '',
    assignedToMe = false
  ): Promise<ApiResponse<ChatSession[]>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(perPage),
        q: search
      })
      if (status) {
        params.set('status', status)
      }
      if (assignedToMe) {
        params.set('assignedToMe', 'true')
      }
      const response = await apiService.client.get<ApiResponse<ChatSession[]>>(
        `/livechat/tickets?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getStats(): Promise<ApiResponse<TicketStats>> {
    try {
      const response = await apiService.client.get<ApiResponse<TicketStats>>(
        '/livechat/tickets/stats',
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getTicketDetail(id: number): Promise<ApiResponse<ChatSession>> {
    try {
      const response = await apiService.client.get<ApiResponse<ChatSession>>(
        `/livechat/tickets/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getStaffMessages(ticketId: number): Promise<ApiResponse<{ session: ChatSession, messages: ChatMessage[] }>> {
    try {
      const response = await apiService.client.get<ApiResponse<{ session: ChatSession, messages: ChatMessage[] }>>(
        `/livechat/tickets/${ticketId}/messages`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async claimTicket(ticketId: number): Promise<ApiResponse<ChatSession>> {
    try {
      const response = await apiService.client.post<ApiResponse<ChatSession>>(
        `/livechat/tickets/${ticketId}/claim`,
        {},
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async staffSendMessage(ticketId: number, payload: SendMessagePayload): Promise<ApiResponse<ChatMessage>> {
    try {
      const response = await apiService.client.post<ApiResponse<ChatMessage>>(
        `/livechat/tickets/${ticketId}/messages`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async resolveTicket(ticketId: number): Promise<ApiResponse<ChatSession>> {
    try {
      const response = await apiService.client.post<ApiResponse<ChatSession>>(
        `/livechat/tickets/${ticketId}/resolve`,
        {},
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async staffUploadMedia(file: File): Promise<ApiResponse<UploadedMedia>> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiService.client.post<ApiResponse<UploadedMedia>>(
        '/livechat/upload',
        formData,
        {
          headers: {
            ...this.authHeaders.headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const liveChatService = new LiveChatService()
