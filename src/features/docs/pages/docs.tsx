import { Background } from '@/shared/components/background'
import { Layout } from '@/shared/components/layout'
import { Sidebar } from '@/shared/components/sidebar'
import { motion } from 'framer-motion'

export function DocsPage() {
  return (
    <Background className="min-h-screen">
      <Layout className="flex flex-row h-full min-h-screen">
        <Sidebar />
        <main className="flex-1 px-8 py-12 max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-neutral dark:prose-invert max-w-none"
          >
            <h1>Project Documentation</h1>
            <p>
              Welcome to the Knowly documentation! Here you will find all the information you need to understand, use, and contribute to the project.
            </p>

            <h2>Getting Started</h2>
            <ol>
              <li>Clone the repository from GitHub.</li>
              <li>Install dependencies with <code>npm install</code> or <code>yarn</code>.</li>
              <li>Run the development server with <code>npm run dev</code>.</li>
            </ol>

            <h2>Project Structure</h2>
            <pre>
{`
src/
  features/
    user-area/
    faq/
    docs/
  shared/
    components/
    utils/
`}
            </pre>

            <h2>Design System</h2>
            <ul>
              <li>All UI components follow the <a href="https://ui.shadcn.com/docs/components/typography" target="_blank" rel="noopener noreferrer">shadcn/ui</a> guidelines.</li>
              <li>Typography, spacing, and colors are consistent across the application.</li>
              <li>Use <code>prose</code> classes for markdown-like content.</li>
            </ul>

            <h2>Contributing</h2>
            <p>
              Contributions are welcome! Please open an issue or submit a pull request with your improvements.
            </p>

            <h2>Support</h2>
            <p>
              For questions or support, contact us at <a href="mailto:suporte@knowly.ai">suporte@knowly.ai</a>.
            </p>
          </motion.article>
        </main>
      </Layout>
    </Background>
  )
}

export default DocsPage