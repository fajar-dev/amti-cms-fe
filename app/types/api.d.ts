export interface SelectOption<V = number> {
  label: string
  value: V
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  from: number
  to: number
}

export type PaginationSummary = Pick<PaginationMeta, 'total' | 'from' | 'to'>

export interface ApiResponse<T = unknown> {
  success: boolean
  statusCode: number
  message: string
  data: T
  meta?: PaginationMeta
}
