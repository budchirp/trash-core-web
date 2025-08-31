import { Fetch } from '@/lib/fetch'
import { CONSTANTS } from '@/lib/constants'

import type { SignInFormValues } from '@/lib/api/session/schemas'
import type { APIHeaders, APIResponse, ServiceResponse, UnprotectedAPIHeaders } from '@/types/api'

export class SessionService {
  public static async create(
    headers: UnprotectedAPIHeaders,
    values: SignInFormValues
  ): Promise<ServiceResponse<string>> {
    try {
      const { json } = await Fetch.post<APIResponse<{ token: string }>>(
        `${CONSTANTS.API_URL}/session`,
        values,
        headers
      )

      if (!json.error) {
        return {
          error: false,
          message: json.message,
          data: json.data.token
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

  public static async verify(headers: APIHeaders): Promise<ServiceResponse> {
    try {
      const { json } = await Fetch.get<APIResponse>(`${CONSTANTS.API_URL}/session/verify`, headers)

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

  public static async delete(
    headers: APIHeaders,
    session: string | null | undefined = null
  ): Promise<ServiceResponse> {
    try {
      const { json } = session
        ? await Fetch.delete<APIResponse>(`${CONSTANTS.API_URL}/session/${session}`, headers)
        : await Fetch.delete<APIResponse>(`${CONSTANTS.API_URL}/session`, headers)

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
}
