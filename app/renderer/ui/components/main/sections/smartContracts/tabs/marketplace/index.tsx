import * as React from "react"

import { TabInfo, TabComponent } from "../../../index"
import { CardMarketplaceProduct } from '../../../../../card';
import { marketplaceProducts } from '../../../wallet/MockData';

const styles = require("./style.scss")

export interface Iprops {
  cover: string
  title: string
  author: string
  rating: string
  alt: string
  tags: string[]
}

class MarketPlace extends TabComponent<any> {

  public render() {

    const createMarketplaceProduct = (props: Iprops) => <CardMarketplaceProduct {...props} />
    return (
      <>
        <div className={styles.header}>
          <p className={styles.title}><span className={styles.sheikah}>Sheikah</span> Marketplace</p>
          <p className={styles.subtitle}>hundred of smart contracts, ready to be deployed</p>
        </div>
        <div className={styles.featured}>
          {marketplaceProducts.map(product => createMarketplaceProduct(product))}
        </div>
        <div className={styles.search}></div>
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