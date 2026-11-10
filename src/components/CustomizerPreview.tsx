import type { CustomizerExtras } from '../data/copy/customizer'

export type CustomizerPreviewProps = {
  copy: CustomizerExtras
}

/**
 * Miniature of the page rendered with the same tokens as the real one, so
 * every preference shows its effect instantly. The diagrams are decorative and
 * hidden from assistive tech; the heading alone names the block.
 */
export default function CustomizerPreview({ copy }: CustomizerPreviewProps) {
  return (
    <div className="customizer-preview">
      <div className="customizer-preview__head">
        <h3 className="customizer-preview__kicker">{copy.previewTitle}</h3>
        <span className="customizer-preview__live">{copy.previewLive}</span>
      </div>

      <div className="customizer-preview__surface" aria-hidden="true">
        <div className="customizer-preview__chrome">
          <span />
          <span />
          <span />
          <b>{copy.previewChrome}</b>
        </div>

        <div className="customizer-preview__body">
          <div className="customizer-preview__copy">
            <span className="customizer-preview__brand">{copy.previewBrand}</span>
            <p className="customizer-preview__title">{copy.previewTitleText}</p>
            <p className="customizer-preview__line">{copy.previewLine}</p>
          </div>

          <div className="customizer-preview__frame">
            <span className="customizer-preview__bar customizer-preview__bar--accent" />
            <span className="customizer-preview__bar" />
            <span className="customizer-preview__bar customizer-preview__bar--short" />
          </div>
        </div>

        <div className="customizer-preview__actions">
          <span className="customizer-preview__cta">
            {copy.previewCta} <span aria-hidden="true">↗</span>
          </span>
          <span className="customizer-preview__spark" />
        </div>
      </div>
    </div>
  )
}
