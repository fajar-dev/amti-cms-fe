import type { ChatTicketStatus } from '~/types/livechat'

export function getChatStatusColor(status?: ChatTicketStatus) {
  switch (status) {
    case 'WAITING': return 'warning'
    case 'IN_PROGRESS': return 'primary'
    case 'RESOLVED': return 'success'
    default: return 'neutral'
  }
}
