import { HomePage } from '@/features/home/pages/home-page'
import { UserInfoPage } from '@/features/user-area/pages/user-info'
import { UserBasesPage } from '@/features/user-area/pages/user-bases'
import { ForgotPasswordPage } from '@/features/forgot-password/pages/forgot-password'
import { ResetPasswordPage } from '@/features/reset-password/pages/reset-password'
import { LoginPage } from '@/features/login/pages/login'
import { SignUpPage } from '@/features/sign-up/pages/sign-up-page'
import { SubscriptionManagementPage } from '@/features/user-area/pages/subscription-management'
import { FAQPage } from '@/features/faq/pages/faq-page'
import { FAQSubscriptionRefundPage } from '@/features/faq/pages/faq-subscription-refund'
import { FAQSubscriptionOthersPage } from '@/features/faq/pages/faq-subscription-others'
import { FAQBasesCreatePage } from '@/features/faq/pages/faq-bases-create'
import { FAQBasesOthersPage } from '@/features/faq/pages/faq-bases-others'
import { FAQContactPage } from '@/features/faq/pages/faq-contact'
import { Page } from '@/shared/components/page'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageWithSidebar } from '@/shared/components/page-with-sidebar'

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Page />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />

          <Route path="faq">
            <Route index element={<FAQPage />} />

            <Route path="subscription">
              <Route path="refund" element={<FAQSubscriptionRefundPage />} />
              <Route path="others" element={<FAQSubscriptionOthersPage />} />
            </Route>

            <Route path="bases">
              <Route path="create" element={<FAQBasesCreatePage />} />
              <Route path="others" element={<FAQBasesOthersPage />} />
            </Route>

            <Route path="contact" element={<FAQContactPage />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route element={<PageWithSidebar />}>
          <Route path="user" element={<UserInfoPage />} />
          <Route path="bases" element={<UserBasesPage />} />
          <Route path="subscription" element={<SubscriptionManagementPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
