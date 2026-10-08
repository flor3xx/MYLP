import type { CSSProperties, ElementType, ReactNode } from 'react'
import { usePreferences } from '../app/usePreferences'
import { useInView } from '../hooks/useInView'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { preferences } = usePreferences()
  const { ref, inView } = useInView<HTMLElement>()
  const visible = preferences.motion === 'off' || inView
  const Component = as

  return (
    <Component
      ref={ref as never}
      className={`reveal${className ? ` ${className}` : ''}`}
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  )
}
