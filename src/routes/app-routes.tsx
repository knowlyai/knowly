import { HomePage } from '@/features/home/pages/home-page'
import { SignUpPage } from '@/features/sign-up/pages/sign-up-page'
import { Page } from '@/shared/components/page'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Page />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
