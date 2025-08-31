import type React from 'react'

import { SignInClientPage } from '@/app/[locale]/(app)/auth/signin/page.client'
import { getCookies } from 'next-client-cookies/server'
import { Column } from '@trash-ui/components'
import { unauthenticate } from '@/lib/auth'

const SignInPage: React.FC = async (): Promise<React.ReactNode> => {
  const cookies = await getCookies()
  await unauthenticate(cookies)

  return (
    <Column padding='md'>
      <SignInClientPage />
    </Column>
  )
}

export default SignInPage
