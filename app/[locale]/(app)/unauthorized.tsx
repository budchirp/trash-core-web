import type React from 'react'

import { CenteredPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { Link } from '@/i18n/routing'

import { Button } from '@trash-ui/components'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const UnauthorizedPage: React.FC<ErrorProps> = (): React.ReactNode => {
  return (
    <CenteredPage items={['Unauthorized']} title={'401'}>
      <Link href='/auth/signin'>
        <Button>Sign in</Button>
      </Link>
    </CenteredPage>
  )
}

export const metadata: Metadata = MetadataManager.generate('Unauthorized', '401')

export default UnauthorizedPage
