import React from 'react'

export function h1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  )
}

export function h2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pt-6 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  )
}

export function h3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function h4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

export function p({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

export function pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-muted mt-4 mb-6 rounded-md p-4 font-mono text-sm">
      {children}
    </pre>
  )
}

export function code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

export function ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6">{children}</ul>
}

export function blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

export function a({
  children,
  href
}: {
  children: React.ReactNode
  href: string
}) {
  return (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  )
}

export function ol({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-6">{children}</ol>
}

export function li({ children }: { children: React.ReactNode }) {
  return <li className="mt-2">{children}</li>
}
