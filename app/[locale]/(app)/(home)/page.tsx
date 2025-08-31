import type React from 'react'

import { Box, BoxContent, Column, Container, Section, Text } from '@trash-ui/components'
import { authenticate } from '@/lib/auth'
import { getCookies } from 'next-client-cookies/server'

const Page: React.FC = async (): Promise<React.ReactNode> => {
  const cookies = await getCookies()
  const user = await authenticate(cookies)

  return (
    <Column padding='md'>
      <Container>
        <Section title='User'>
          <Box>
            <BoxContent>
              <Text>{JSON.stringify(user)}</Text>
            </BoxContent>
          </Box>
        </Section>
      </Container>
    </Column>
  )
}

export default Page
