import { HomePage } from '@/features/home/pages/home-page'
import { ForgotPasswordPage } from '@/features/forgot-password/pages/forgot-password'
import { ResetPasswordPage } from '@/features/reset-password/pages/reset-password'
import { LoginPage } from '@/features/login/pages/login'
import { SignUpPage } from '@/features/sign-up/pages/sign-up-page'
import { FAQPage } from '@/features/faq/pages/faq-page'
import { FAQSubscriptionRefundPage } from '@/features/faq/pages/faq-subscription-refund'
import { Page } from '@/shared/components/page'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Page />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/faq/subscription/refund"
            element={<FAQSubscriptionRefundPage />}
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
