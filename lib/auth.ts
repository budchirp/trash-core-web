import { InvalidSessionError } from '@/lib/error/invalild-session'
import { UserNotFoundError } from '@/lib/error/user-not-found'
import { SessionService } from '@/lib/api/session'
import { redirect, unauthorized } from 'next/navigation'
import { UserService } from '@/lib/api/user'
import { CONSTANTS } from '@/lib/constants'

import type { Cookies } from 'next-client-cookies'
import type { User } from '@/types/user'

export const authenticate = async (cookies: Cookies): Promise<User> => {
  const token = cookies.get(CONSTANTS.COOKIES.TOKEN)
  if (!token) {
    return unauthorized()
  }

  const verify = await SessionService.verify({ token })
  if (verify.error) {
    throw new InvalidSessionError()
  }

  const user = await UserService.get({ token })
  if (user.error) {
    throw new UserNotFoundError()
  }

  return user.data
}

export const unauthenticate = async (cookies: Cookies): Promise<void> => {
  const token = cookies.get(CONSTANTS.COOKIES.TOKEN)
  if (token) {
    return redirect('/')
  }
}
