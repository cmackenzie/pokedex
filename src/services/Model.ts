export interface ServiceResourceResponse<T> {
  resource:T | null
}

export interface ServicePagedResourceResponse<T> {
  next: string | null
  previous: string | null
  count: number
  resources: T[]
}
