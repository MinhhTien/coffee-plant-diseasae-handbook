export type SuccessResponseDto = {
  success: boolean
}

export type IdResponseDto = {
  _id: string
}

export type ListResponseDto<T> = {
  docs: T[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type BaseMediaDto = {
  asset_id: string
  public_id: string
  format: string
  resource_type: 'image' | 'video'
  created_at: string
  type: 'authenticated' | 'upload' | 'private'
  url: string
  asset_folder: string
  original_filename: string
  original_extension: string
  isAddedLater?: boolean
}
