import { HomePage } from '@/features/home/pages/home-page'
import { UserInfoPage } from '@/features/user-area/pages/user-info'
import { Page } from '@/shared/components/page'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Page />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-info/:userId" element={<UserInfoPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
