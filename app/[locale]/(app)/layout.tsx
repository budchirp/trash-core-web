import type React from 'react'

import { Column } from '@trash-ui/components'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'

import type { LayoutProps } from '@/types/layout'

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <>
      <Column className='gap-0'>
        <Header />

        <main id='main' className='min-h-screen_'>
          {children}
        </main>
      </Column>

      <Footer />
    </>
  )
}

export default Layout
