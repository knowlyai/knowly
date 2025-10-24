import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/navbar'
import { Toaster } from 'react-hot-toast'
import { DocsSidebar } from '@/shared/components/docs-sidebar'
import { Background } from '@/shared/components/background'
import { BackgroundBlobs } from '@/shared/components/background-blobs'

export function DocsLayout() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Background className="min-h-screen">
        <BackgroundBlobs />
        <Navbar />
        <DocsSidebar />
        <main className="mt-16 ml-0 min-h-screen transition-all duration-300 md:ml-20 lg:ml-64">
          <div className="container mx-auto max-w-4xl px-6 pt-20 pb-12 md:px-12 md:pt-12 lg:py-16">
            <article className="prose prose-lg prose-invert max-w-none">
              <Outlet />
            </article>
          </div>
        </main>
      </Background>
    </>
  )
}
