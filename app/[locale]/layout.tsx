import type React from 'react'

import { UserContextProvider } from '@/providers/user-provider'
import { getCookies } from 'next-client-cookies/server'
import { setRequestLocale } from 'next-intl/server'
import { CONSTANTS } from '@/lib/constants'
import { UserService } from '@/lib/api/user'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { hasLocale } from 'next-intl'

import type { Metadata } from 'next'
import type { DynamicLayoutProps } from '@/types/layout'

const Layout: React.FC<DynamicLayoutProps> = async ({
  children,
  params
}: DynamicLayoutProps): Promise<React.ReactNode> => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const cookies = await getCookies()

  const token = cookies.get(CONSTANTS.COOKIES.TOKEN)
  if (token) {
    const user = await UserService.get({ token, locale })
    if (user.error) {
      return children
    }

    return (
      <UserContextProvider token={token} initialUser={user.data}>
        {children}
      </UserContextProvider>
    )
  }

  return children
}

export const metadata: Metadata = {
  title: CONSTANTS.APP_NAME
}

export const generateStaticParams = async (): Promise<{ locale: string }[]> => {
  return routing.locales.map((locale) => ({ locale }))
}

export default Layout
