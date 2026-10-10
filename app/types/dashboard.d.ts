export interface DashboardSummary {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalViews: number
  totalUsers: number
  totalCategories: number
  totalMessages: number
  unreadMessages: number
  totalFaqs: number
}

export interface ViewsTrendItem {
  date: string
  label: string
  views: number
  articles: number
}

export interface ArticlesByCategoryItem {
  name: string
  count: number
}

export interface MessagesTrendItem {
  month: string
  unread: number
  read: number
}

export interface DashboardRecentArticle {
  id: number
  title: string
  slug: string
  status: string
  cover?: string | null
  coverUrl?: string | null
  viewsCount: number
  category?: {
    id: number
    name: string
  } | null
  author?: {
    id: number
    name: string
  } | null
  createdAt: string
}

export interface DashboardRecentMessage {
  id: number
  name: string
  email: string
  subject: string
  isRead: boolean
  createdAt: string
}

export interface DashboardStats {
  summary: DashboardSummary
  viewsTrend: ViewsTrendItem[]
  articlesByCategory: ArticlesByCategoryItem[]
  messagesTrend: MessagesTrendItem[]
  recentArticles: DashboardRecentArticle[]
  recentMessages: DashboardRecentMessage[]
}
