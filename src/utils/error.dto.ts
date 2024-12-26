export type ErrorResponseDto = {
  error: string
  message: string
  data: unknown
}

export class TokenError extends Error {}
