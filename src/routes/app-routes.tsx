import { HomePage } from '@/features/home/pages/home-page'
import { Page } from '@/shared/components/page'
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}

        <Route element={<Page />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </Suspense>
  )
}
