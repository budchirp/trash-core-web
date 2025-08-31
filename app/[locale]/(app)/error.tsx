'use client'

import type React from 'react'

import { CenteredPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { useLogout } from '@/lib/hooks/use-logout'
import { useTranslations } from 'next-intl'

import { Button } from '@trash-ui/components'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }: ErrorProps): React.ReactNode => {
  const t = useTranslations()

  let message = t('error')
  let authError = false

  switch (error.name) {
    case 'InvalidSessionError':
      message = t('invalid_session')
      authError = true
      break
    case 'UserNotFoundError':
      message = t('user_not_found')
      authError = true
      break
    default:
      break
  }

  const logout = useLogout()

  return (
    <CenteredPage items={[message]} title={'500'}>
      <Button onClick={() => reset()}>{t('retry')}</Button>

      {authError && (
        <Button color='surface' onClick={() => logout()}>
          {t('logout')}
        </Button>
      )}
    </CenteredPage>
  )
}

export const metadata: Metadata = MetadataManager.generate('Error', '500')

export default ErrorPage
