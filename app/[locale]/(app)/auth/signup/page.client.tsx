'use client'

import type React from 'react'

import { type SignUpFormValues, signUpSchema } from '@/lib/api/user/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'use-intl'
import { UserService } from '@/lib/api/user'
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

export const SignUpClientPage: React.FC = (): React.ReactNode => {
  const locale = useLocale()
  const t = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (values: SignUpFormValues) => {
    const response = await UserService.create({ locale }, values)
    if (response.error) {
      toast(response.message ?? t('error'))
      return
    }

    window.location.replace('/auth/signin')
  }

  return (
    <Container className='!max-w-128'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section
          title='Sign up'
          description={
            <Link href='/auth/signin'>
              <Heading className='text-tertiary' size='h4'>
                Already have an account? sign in
              </Heading>
            </Link>
          }
        >
          <Column className='gap-2'>
            <Field label={`${t('email')}:`} error={errors.email?.message}>
              <Input
                placeholder={t('enter', { field: t('email') })}
                type='email'
                {...register('email')}
              />
            </Field>

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
            {isSubmitting ? t('loading') : t('sign_up')}
          </Button>
        </Section>
      </form>
    </Container>
  )
}
