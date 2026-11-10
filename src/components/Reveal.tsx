import type { CSSProperties, ElementType, ReactNode } from 'react'
import { usePreferences } from '../app/usePreferences'
import { useInView, usePrefersReducedMotion } from '../hooks/useInView'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

/**
 * Entrance state for one element: content is visible by default, moves only
 * with transform/opacity, and never animates when motion is off or reduced.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { preferences } = usePreferences()
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLElement>()
  const visible = preferences.motion === 'off' || reducedMotion || inView
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
