export const transitionCard = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const cardVariants = {
  hidden: {
    filter: 'blur(10px)',
    transform: 'translateY(30px) scale(0.95)',
    opacity: 0
  },
  visible: {
    filter: 'blur(0)',
    transform: 'translateY(0) scale(1)',
    opacity: 1,
    transition: transitionCard
  }
}
