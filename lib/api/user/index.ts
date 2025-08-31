import { Fetch } from '@/lib/fetch'
import { CONSTANTS } from '@/lib/constants'

import type { APIHeaders, APIResponse, ServiceResponse, UnprotectedAPIHeaders } from '@/types/api'
import type { SignUpFormValues } from '@/lib/api/user/schemas'
import type { User } from '@/types/user'

export class UserService {
  public static async create(
    headers: UnprotectedAPIHeaders,
    values: SignUpFormValues
  ): Promise<ServiceResponse> {
    try {
      const { json } = await Fetch.post<APIResponse>(`${CONSTANTS.API_URL}/user`, values, headers)

      if (!json.error) {
        return {
          error: false,
          message: json.message,
          data: null
        }
      }

      return {
        error: true,
        message: json.message,
        data: null
      }
    } catch (error) {
      console.error(error)

      return {
        error: true,
        message: null,
        data: null
      }
    }
  }

  public static async get(
    headers: Omit<APIHeaders, 'token'> & { token?: string | null }
  ): Promise<ServiceResponse<User>> {
    try {
      const { json } = await Fetch.get<APIResponse<User>>(`${CONSTANTS.API_URL}/user`, headers)

      if (!json.error) {
        return {
          error: false,
          message: json.message,
          data: json.data
        }
      }

      return {
        error: true,
        message: json.message,
        data: null
      }
    } catch (error) {
      console.error(error)

      return {
        error: true,
        message: null,
        data: null
      }
    }
  }
}
