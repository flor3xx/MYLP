import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import { MECH_CLIPS } from "../data/content"

type ClipPickerProps = {
  value: string
  onChange: (value: string) => void
}

const CLIPS = MECH_CLIPS as readonly string[]
const label = (clip: string) => clip.replace(/_/g, " ")

export default function ClipPicker({ value, onChange }: ClipPickerProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const id = useId()

  const selectedIndex = Math.max(0, CLIPS.indexOf(value))

  const openMenu = () => {
    setActive(selectedIndex)
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: "nearest" })
  }, [open, active])

  const choose = (clip: string) => {
    onChange(clip)
    setOpen(false)
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        openMenu()
      }
      return
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setActive((i) => Math.min(i + 1, CLIPS.length - 1))
        break
      case "ArrowUp":
        event.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
        break
      case "Home":
        event.preventDefault()
        setActive(0)
        break
      case "End":
        event.preventDefault()
        setActive(CLIPS.length - 1)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        choose(CLIPS[active])
        break
      case "Escape":
        event.preventDefault()
        setOpen(false)
        break
      case "Tab":
        setOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div className="clip" ref={rootRef} onKeyDown={onKeyDown}>
      <span className="clip__label" id={`${id}-label`}>
        Animazione
      </span>

      <button
        type="button"
        className="clip__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        <span className="clip__value" id={`${id}-value`}>
          {label(value)}
        </span>
        <svg className="clip__chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="clip__menu"
          role="listbox"
          aria-labelledby={`${id}-label`}
          ref={listRef}
        >
          {CLIPS.map((clip, index) => (
            <li
              key={clip}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={clip === value}
              data-active={index === active}
              className={`clip__option${index === active ? " is-active" : ""}${
                clip === value ? " is-selected" : ""
              }`}
              onPointerEnter={() => setActive(index)}
              onClick={() => choose(clip)}
            >
              {label(clip)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
