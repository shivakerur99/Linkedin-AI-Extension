import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import { LinkedinExtension } from "~features/LinkedinExtension"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <>
      <div className="prompt-field">
        <LinkedinExtension />
      </div>
    </>
  )
}

export default PlasmoOverlay
