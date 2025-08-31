import type React from 'react'

import { SignUpClientPage } from '@/app/[locale]/(app)/auth/signup/page.client'
import { getCookies } from 'next-client-cookies/server'
import { Column } from '@trash-ui/components'
import { unauthenticate } from '@/lib/auth'

const SignUpPage: React.FC = async (): Promise<React.ReactNode> => {
  const cookies = await getCookies()
  await unauthenticate(cookies)

  return (
    <Column padding='md'>
      <SignUpClientPage />
    </Column>
  )
}

export default SignUpPage
