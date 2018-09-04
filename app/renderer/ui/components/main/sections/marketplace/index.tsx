import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"

const svgImage = require("svg/marketplace.svg")
const styles = require("./style.scss")

/**
 * Marketplace component
 *
 * @class Marketplace
 * @extends {React.Component<SectionProps>}
 */
class Marketplace extends React.Component<SectionProps> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.layout}>
        <img src={svgImage} />
      </div>
    )
  }
}

const MarketplaceSection: SectionInfo = {
  key: "marketplace",
  caption: "Marketplace",
  sectionPath: urls.MARKETPLACE_SECTION,
  path: urls.MARKETPLACE_SECTION,
  component: Marketplace,
  icon: "shopping-bag"
}

export default MarketplaceSection