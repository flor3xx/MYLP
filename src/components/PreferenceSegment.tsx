import { useId } from "react"

export type PreferenceOption<T extends string> = {
  value: T
  label: string
  description?: string
}

export type PreferenceSegmentProps<T extends string> = {
  label: string
  value: T
  options: readonly PreferenceOption<T>[]
  onChange: (value: T) => void
  name?: string
}

/** A keyboard-friendly, button-based segmented preference control. */
export default function PreferenceSegment<T extends string>({
  label,
  value,
  options,
  onChange,
  name,
}: PreferenceSegmentProps<T>) {
  const id = useId()
  const labelId = `${id}-label`

  return (
    <fieldset className="customizer-segment">
      <legend className="customizer-segment__label" id={labelId}>
        {label}
      </legend>
      <div
        className="customizer-segment__options"
        role="group"
        aria-labelledby={labelId}
        data-name={name}
      >
        {options.map((option) => {
          const selected = option.value === value
          const optionId = `${id}-${option.value}`

          return (
            <button
              key={option.value}
              id={optionId}
              type="button"
              className={`customizer-segment__option${selected ? " is-active" : ""}`}
              aria-pressed={selected}
              aria-label={option.description ? `${option.label}: ${option.description}` : undefined}
              onClick={() => onChange(option.value)}
            >
              <span className="customizer-segment__option-label">{option.label}</span>
              {option.description && (
                <span className="customizer-segment__option-description">
                  {option.description}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
