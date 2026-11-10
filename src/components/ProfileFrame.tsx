import { PROFILE_IMAGE } from "../assets/profile"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { Frame } from "./Frame"

/** Nicolò's real portrait, framed like every other cell of the contact sheet. */
export default function ProfileFrame() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)

  return (
    <Frame
      label={preferences.language === "it" ? "nicolò florean / ritratto" : "nicolò florean / portrait"}
      className="frame--photo"
    >
      <img
        className="frame__image"
        src={PROFILE_IMAGE}
        alt={copy.hero.photoAlt}
        width={1066}
        height={1600}
        loading="eager"
        decoding="async"
      />
    </Frame>
  )
}
