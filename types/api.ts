export type APIHeaders = {
  token: string
  locale?: string
}

export type UnprotectedAPIHeaders = Omit<APIHeaders, 'token'>

export type APIResponse<T = any> = {
  error: boolean
  message: string
  data: T
}

export type ServiceResponse<T = undefined | null> =
  | {
      error: false
      message: string
      data: T
    }
  | {
      error: true
      message?: string | null
      data: null
    }
