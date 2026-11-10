import { useEffect, useId, useRef, useState, type RefObject } from 'react'
import { usePreferences } from '../app/usePreferences'
import type {
  AccentIntensity,
  AccentUsage,
  ColorScheme,
  Density,
  FontChoice,
  HeadingTracking,
  ImageTreatment,
  Language,
  Layout,
  Motion,
  Radius,
  Surface,
  SurfaceStyle,
  Theme,
  TypeScale,
} from '../app/preferences'
import PreferenceSegment, { type PreferenceOption } from './PreferenceSegment'
import CustomizerPreview from './CustomizerPreview'
import CustomizerPresets from './CustomizerPresets'
import {
  advancedSettings,
  customizerExtras,
  presetCopy,
} from '../data/copy/customizer'
import { t } from '../data/translations'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock } from '../hooks/useScrollLock'

const TYPE_SCALE_ORDER = ['small', 'regular', 'large'] as const
const HEADING_TRACKING_ORDER = ['tight', 'normal', 'wide'] as const
const SURFACE_STYLE_ORDER = ['solid', 'panel', 'outline'] as const
const ACCENT_USAGE_ORDER = ['action', 'everywhere'] as const

function toOptions<T extends string>(
  labels: Record<T, string>,
  order: readonly T[],
): PreferenceOption<T>[] {
  return order.map((value) => ({ value, label: labels[value] }))
}

export type CustomizerSheetProps = {
  open: boolean
  onClose: () => void
  id?: string
  title?: string
  returnFocusRef?: RefObject<HTMLElement | null>
}

/**
 * Responsive preferences dialog: a side panel on desktop, a bottom sheet on
 * mobile. Modal semantics (focus trap, scroll lock, Escape, focus return) are
 * handled here; the visual state stays in the preferences provider.
 */
export default function CustomizerSheet({
  open,
  onClose,
  id = 'customizer-sheet',
  title,
  returnFocusRef,
}: CustomizerSheetProps) {
  const { preferences, actions } = usePreferences()
  const language = preferences.language
  const copy = t(language)
  const extras = customizerExtras[language]
  const advanced = advancedSettings[language]
  const presets = presetCopy[language]

  const uid = useId()
  const titleId = `${uid}-title`
  const leadId = `${uid}-lead`
  const baseGroupId = `${uid}-base`
  const shapeGroupId = `${uid}-shape`
  const matterGroupId = `${uid}-matter`

  const panelRef = useRef<HTMLElement>(null)
  const onCloseRef = useRef(onClose)
  const previousPreferences = useRef(preferences)
  const hasOpened = useRef(false)
  const [saveCount, setSaveCount] = useState(0)

  useScrollLock(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Focus moves on the next frame: the panel is still `visibility: hidden`
  // while the browser commits the open state, and hidden nodes refuse focus.
  useEffect(() => {
    if (open) {
      hasOpened.current = true
      const frame = window.requestAnimationFrame(() => {
        panelRef.current?.focus({ preventScroll: true })
      })
      return () => window.cancelAnimationFrame(frame)
    }
    if (!hasOpened.current) return
    hasOpened.current = false
    const frame = window.requestAnimationFrame(() => {
      returnFocusRef?.current?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open, returnFocusRef])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onCloseRef.current()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (previousPreferences.current === preferences) return
    previousPreferences.current = preferences
    setSaveCount((count) => count + 1)
  }, [preferences])

  const state = open ? 'open' : 'closed'
  const savedMessage =
    saveCount === 0
      ? extras.autoSave
      : saveCount === 1
        ? extras.savedOne
        : extras.savedMany.replace('{count}', String(saveCount))

  return (
    <>
      <div
        className="customizer-scrim"
        data-state={state}
        aria-hidden="true"
        onClick={open ? onClose : undefined}
      />
      <section
        ref={panelRef}
        id={id}
        className="customizer-sheet"
        data-state={state}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={leadId}
        tabIndex={-1}
        inert={!open}
      >
        <div className="customizer-sheet__handle" aria-hidden="true" />

        <div className="customizer-sheet__header">
          <div>
            <p className="customizer-sheet__kicker">
              {language === 'it' ? 'Sistema vivo' : 'Live system'}
            </p>
            <h2 className="customizer-sheet__title" id={titleId}>
              {title ?? copy.customizer.title}
            </h2>
            <p className="customizer-sheet__lead" id={leadId}>
              {extras.sheetLead}
            </p>
          </div>
          <button
            type="button"
            className="customizer-sheet__close"
            aria-label={copy.customizer.closeAria}
            onClick={onClose}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
              <path
                d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="customizer-sheet__body">
          <CustomizerPreview copy={extras} />

          <CustomizerPresets copy={presets} />

          <section className="customizer-group" role="group" aria-labelledby={baseGroupId}>
            <h3 className="customizer-group__title" id={baseGroupId}>
              {extras.groupBase}
            </h3>
            <PreferenceSegment<Language>
              label={copy.settings.language}
              value={language}
              onChange={actions.setLanguage}
              options={[
                { value: 'it', label: 'Italiano' },
                { value: 'en', label: 'English' },
              ]}
            />
            <PreferenceSegment<Theme>
              label={copy.settings.theme}
              value={preferences.theme}
              onChange={actions.setTheme}
              options={[
                { value: 'dark', label: copy.settings.dark },
                { value: 'light', label: copy.settings.light },
              ]}
            />
            <PreferenceSegment<ColorScheme>
              label={copy.settings.color}
              value={preferences.colorScheme}
              onChange={actions.setColorScheme}
              options={[
                { value: 'pink', label: copy.settings.pink },
                { value: 'blue', label: copy.settings.blue },
                { value: 'lime', label: copy.settings.lime },
                { value: 'orange', label: copy.settings.orange },
              ]}
            />
            <PreferenceSegment<AccentIntensity>
              label={copy.settings.intensity}
              value={preferences.accentIntensity}
              onChange={actions.setAccentIntensity}
              options={[
                { value: 'subtle', label: copy.settings.subtle },
                { value: 'standard', label: copy.settings.standard },
                { value: 'vivid', label: copy.settings.vivid },
              ]}
            />
            <PreferenceSegment<AccentUsage>
              label={advanced.accentUsage.label}
              value={preferences.accentUsage}
              onChange={actions.setAccentUsage}
              options={toOptions(advanced.accentUsage.options, ACCENT_USAGE_ORDER)}
            />
          </section>

          <section className="customizer-group" role="group" aria-labelledby={shapeGroupId}>
            <h3 className="customizer-group__title" id={shapeGroupId}>
              {extras.groupShape}
            </h3>
            <PreferenceSegment<FontChoice>
              label={copy.settings.font}
              value={preferences.font}
              onChange={actions.setFont}
              options={[
                { value: 'grotesk', label: copy.settings.grotesk },
                { value: 'editorial', label: copy.settings.editorial },
                { value: 'geometric', label: copy.settings.geometric },
              ]}
            />
            <PreferenceSegment<TypeScale>
              label={advanced.typeScale.label}
              value={preferences.typeScale}
              onChange={actions.setTypeScale}
              options={toOptions(advanced.typeScale.options, TYPE_SCALE_ORDER)}
            />
            <PreferenceSegment<HeadingTracking>
              label={advanced.headingTracking.label}
              value={preferences.headingTracking}
              onChange={actions.setHeadingTracking}
              options={toOptions(advanced.headingTracking.options, HEADING_TRACKING_ORDER)}
            />
            <PreferenceSegment<Layout>
              label={copy.settings.layout}
              value={preferences.layout}
              onChange={actions.setLayout}
              options={[
                { value: 'sheet', label: copy.settings.sheet },
                { value: 'split', label: copy.settings.split },
                { value: 'centered', label: copy.settings.centered },
              ]}
            />
            <PreferenceSegment<Density>
              label={copy.settings.density}
              value={preferences.density}
              onChange={actions.setDensity}
              options={[
                { value: 'comfortable', label: copy.settings.comfortable },
                { value: 'compact', label: copy.settings.compact },
                { value: 'dense', label: copy.settings.dense },
              ]}
            />
            <PreferenceSegment<Radius>
              label={copy.settings.radius}
              value={preferences.radius}
              onChange={actions.setRadius}
              options={[
                { value: 'soft', label: copy.settings.soft },
                { value: 'rounded', label: copy.settings.rounded },
                { value: 'sharp', label: copy.settings.sharp },
              ]}
            />
          </section>

          <section className="customizer-group" role="group" aria-labelledby={matterGroupId}>
            <h3 className="customizer-group__title" id={matterGroupId}>
              {extras.groupMatter}
            </h3>
            <PreferenceSegment<Motion>
              label={copy.settings.motion}
              value={preferences.motion}
              onChange={actions.setMotion}
              options={[
                { value: 'off', label: copy.settings.off },
                { value: 'calm', label: copy.settings.calm },
                { value: 'on', label: copy.settings.on },
                { value: 'expressive', label: copy.settings.expressive },
              ]}
            />
            <PreferenceSegment<Surface>
              label={copy.settings.surface}
              value={preferences.surface}
              onChange={actions.setSurface}
              options={[
                { value: 'flat', label: copy.settings.flat },
                { value: 'grain', label: copy.settings.grain },
                { value: 'scanlines', label: copy.settings.scanlines },
              ]}
            />
            <PreferenceSegment<SurfaceStyle>
              label={advanced.surfaceStyle.label}
              value={preferences.surfaceStyle}
              onChange={actions.setSurfaceStyle}
              options={toOptions(advanced.surfaceStyle.options, SURFACE_STYLE_ORDER)}
            />
            <PreferenceSegment<ImageTreatment>
              label={copy.settings.imageTreatment}
              value={preferences.imageTreatment}
              onChange={actions.setImageTreatment}
              options={[
                { value: 'natural', label: copy.settings.natural },
                { value: 'monochrome', label: copy.settings.monochrome },
                { value: 'highContrast', label: copy.settings.highContrast },
              ]}
            />
          </section>
        </div>

        <div className="customizer-sheet__footer">
          <p
            className="customizer-sheet__status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {savedMessage}
          </p>
          <button type="button" className="customizer-sheet__reset" onClick={actions.reset}>
            {copy.customizer.reset}
          </button>
        </div>
      </section>
    </>
  )
}
