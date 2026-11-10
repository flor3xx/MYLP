import type { ReactNode } from "react"

type FrameProps = {
  label: string
  children: ReactNode
  className?: string
}

/**
 * One cell of the contact sheet: the shared chrome bar, a visible label and a
 * body slot. Specimens and the real portrait both sit inside this frame, so the
 * archive reads as one system instead of a photo glued next to some diagrams.
 */
export function Frame({ label, children, className = "" }: FrameProps) {
  return (
    <figure className={`frame${className ? ` ${className}` : ""}`}>
      <figcaption className="frame__chrome">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <b>{label}</b>
      </figcaption>
      <div className="frame__body">{children}</div>
    </figure>
  )
}
