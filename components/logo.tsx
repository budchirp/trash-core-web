import type React from 'react'

import { Heading } from '@trash-ui/components'
import Link from 'next/link'

import type { HeadingProps } from '@trash-ui/components'

export const Logo: React.FC<HeadingProps> = (props: HeadingProps): React.ReactNode => {
  return (
    <Link href='/'>
      <Heading {...props} size='h2'>
        Trash
      </Heading>
    </Link>
  )
}
Logo.displayName = 'Logo'
