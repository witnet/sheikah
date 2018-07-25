import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/pages/main/sections"
import { CardMarketplaceProduct } from "app/renderer/ui/components/card"
import { marketplaceProducts } from "app/renderer/ui/pages/main/sections/wallet/MockData"

const styles = require("./style.scss")

export interface Iprops {
  cover: string
  title: string
  author: string
  rating: string
  alt: string
  tags: Array<string>
}

/**
 * MarketPlace component
 *
 * @class MarketPlace
 * @extends {TabComponent<any>}
 */
class MarketPlace extends TabComponent<any> {

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    const createMarketPlaceProduct = () => marketplaceProducts
      .map((product) => <CardMarketplaceProduct key={product.title} {...product} />)

    return (
      <>
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
        {/* <div className={styles.search}> </div> */}
      </>
    )
  }
}

const MarketPlaceTab: TabInfo = {
  key: "MarketPlace",
  caption: "Marketplace",
  component: MarketPlace
}

export default MarketPlaceTab