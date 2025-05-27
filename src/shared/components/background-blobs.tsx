import { motion, Transition } from 'framer-motion'

export function BackgroundBlobs() {
  const blobTransition = {
    repeat: Infinity,
    repeatType: 'mirror',
    duration: 30,
    ease: 'easeInOut'
  } as const satisfies Transition

  return (
    <>
      {/* Light mode blobs use CSS variables for consistent visibility */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 0.4, 0.2, 0.4, 0],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={blobTransition}
        className="fixed inset-0 -z-10 m-auto h-[80vh] w-[80vw] rounded-full blur-[200px]"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.3 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.3, 0.1, 0.3, 0],
          x: [50, -50, 50],
          y: [20, -20, 20]
        }}
        transition={{ ...blobTransition, duration: 35 }}
        className="fixed inset-0 -z-20 m-auto h-[60vh] w-[60vw] rounded-full blur-[180px]"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.2 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: [0, 0.2, 0.05, 0.2, 0],
          x: [-50, 50, -50],
          y: [50, -50, 50]
        }}
        transition={{ ...blobTransition, duration: 40 }}
        className="fixed inset-0 -z-30 m-auto h-[50vh] w-[50vw] rounded-full blur-[220px]"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.25 }}
      />
    </>
  )
}
