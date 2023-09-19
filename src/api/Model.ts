export interface ApiResponse<T> {
  item: T | null
}

export interface PagedApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  items: T[]
}
