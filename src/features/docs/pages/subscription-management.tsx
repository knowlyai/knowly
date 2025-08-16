import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { motion } from 'framer-motion'
import {
  h1,
  h2,
  p,
} from '@/shared/components/typography'
import { BackgroundBlobs } from '@/shared/components/background-blobs'


export function DocsPlansPage() {
  return (
    <Background className="min-h-screen">
      <BackgroundBlobs />
      <Layout className="w-full">
        <main className="flex flex-col items-center justify-center p-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <section>
              
            </section>
          </motion.article>
        </main>
      </Layout>
    </Background>
  )
}

export default DocsPlansPage
