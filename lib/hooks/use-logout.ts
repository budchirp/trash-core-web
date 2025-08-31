'use client'

import { use } from 'react'

import { UserContext } from '@/providers/context/user'
import { SessionService } from '@/lib/api/session'
import { useCookies } from 'next-client-cookies'
import { CONSTANTS } from '@/lib/constants'
import { useRouter } from 'next/navigation'

export const useLogout = (): ((session?: string | null) => Promise<void>) => {
  const { setUser } = use(UserContext)

  const cookies = useCookies()
  const router = useRouter()

  const token = cookies.get(CONSTANTS.COOKIES.TOKEN)

  return async (session: string | null | undefined = null) => {
    if (token) {
      await SessionService.delete({ token }, session)

      cookies.remove(CONSTANTS.COOKIES.TOKEN)

      setUser(null)

      window.location.replace('/')
    }
  }
}
