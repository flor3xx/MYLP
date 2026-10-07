import { MECH_CLIPS } from "../data/content"

type ClipPickerProps = {
  value: string
  onChange: (value: string) => void
}

export default function ClipPicker({ value, onChange }: ClipPickerProps) {
  return (
    <label className="clip">
      <span className="clip__label">Animazione</span>
      <span className="clip__field">
        <select
          className="clip__select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {MECH_CLIPS.map((clip) => (
            <option key={clip} value={clip}>
              {clip.replace(/_/g, " ")}
            </option>
          ))}
        </select>
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
      </span>
    </label>
  )
}
