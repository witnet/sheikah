import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"
import { marketplaceProducts } from "app/renderer/ui/components/main/sections/wallet/MockData"
import { CardMarketplaceProduct } from "app/renderer/ui/components/card"

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
    const createMarketPlaceProduct = () => marketplaceProducts
      .map((product) => <CardMarketplaceProduct key={product.title} {...product} />)

    return (
      <>
        <div className={styles.layout}>
          <div className={styles.header}>
            <p className={styles.title}>
              <span className={styles.sheikah}>Sheikah</span> Marketplace
            </p>
            <p className={styles.subtitle}>
              hundred of smart contracts, ready to be deployed
            </p>
          </div>
          <div className={styles.featured}>
            {createMarketPlaceProduct()}
          </div>
        </div>
      </>
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