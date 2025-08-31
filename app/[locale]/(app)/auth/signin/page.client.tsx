'use client'

import type React from 'react'

import { type SignInFormValues, signInSchema } from '@/lib/api/session/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'use-intl'
import { SessionService } from '@/lib/api/session'
import { useCookies } from 'next-client-cookies'
import { CONSTANTS } from '@/lib/constants'
import { useForm } from 'react-hook-form'
import { Link } from '@/i18n/routing'

import {
  Button,
  Column,
  Container,
  Field,
  Heading,
  Input,
  Section,
  toast
} from '@trash-ui/components'

export const SignInClientPage: React.FC = (): React.ReactNode => {
  const locale = useLocale()
  const t = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema)
  })

  const cookies = useCookies()

  const onSubmit = async (values: SignInFormValues) => {
    const response = await SessionService.create({ locale }, values)
    if (response.error) {
      toast(response.message ?? t('error'))
      return
    }

    cookies.set(CONSTANTS.COOKIES.TOKEN, response.data)

    window.location.replace('/')
  }

  return (
    <Container className='!max-w-128'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section
          title={t('sign_in')}
          description={
            <Link href='/auth/signup'>
              <Heading className='text-tertiary' size='h4'>
                {t('dont_have_an_account')}
              </Heading>
            </Link>
          }
        >
          <Column className='gap-2'>
            <Field label={`${t('username')}:`} error={errors.username?.message}>
              <Input
                placeholder={t('enter', { field: t('username') })}
                type='text'
                {...register('username')}
              />
            </Field>

            <Field label={`${t('password')}:`} error={errors.password?.message}>
              <Input
                placeholder={t('enter', { field: t('password') })}
                type='password'
                {...register('password')}
              />
            </Field>
          </Column>

          <Button type='submit' loading={isSubmitting}>
            {isSubmitting ? t('loading') : t('sign_in')}
          </Button>
        </Section>
      </form>
    </Container>
  )
}
