import type React from 'react'

import { cn, Column, Container, ToastProvider } from '@trash-ui/components'
import { CookiesProvider } from 'next-client-cookies/server'
import { NextIntlClientProvider } from 'next-intl'
import { Lexend } from 'next/font/google'

import type { Metadata } from 'next'
import type { LayoutProps } from '@/types/layout'

import '@/app/globals.css'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-main'
})

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <html lang='en'>
      <body className={cn('size-full relative', lexend.variable)}>
        <CookiesProvider>
          <ToastProvider />

          <div className='absolute z-0 inset-0 overflow-hidden'>
            <Container className='absolute inset-0'>
              <div className='absolute top-[10%] left-[15%] size-96 opacity-25 bg-accent-500 rounded-full blur-[128px]' />
              <div className='absolute top-[35%] right-[20%] size-96 opacity-25 bg-accent-600 rounded-full blur-[128px]' />
              <div className='absolute top-[50%] left-[25%] size-96 opacity-25 bg-accent-800 rounded-full blur-[128px]' />
              <div className='absolute top-[75%] right-[10%] size-96 opacity-25 bg-accent-700 rounded-full blur-[128px]' />
            </Container>
          </div>

          <Column className='relative z-10 size-full'>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </Column>
        </CookiesProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Trash Core',
  description: 'Trash Core'
}

export default Layout
