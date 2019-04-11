import * as React from "react"

import {
  SectionInfo,
  SectionProps,
} from "app/renderer/ui/components/main/sections"

import * as urls from "app/renderer/constants/urls"
import { marketplaceProducts } from "app/renderer/ui/components/main/sections/marketplace/MockData"
import  { RadonQuery }  from "app/renderer/ui/components/query"

const styles = require("./style.scss")
const items = marketplaceProducts.map((item, i) => (
  <div className={styles.item} key={i}>
    <div className={styles["item-img"]}>
      <img />
    </div>
    <div className={styles["item-text"]}>
      <img />
      <p>{item.title}</p>
      <p>@{item.author}</p>
      <p>{item.rating}</p>
      <p className={styles["hashtag-list"]}>
        {item.tags.map(tag => (<a className={styles["hashtag-item"]} href="#" key={i}>{tag}</a>))}
      </p>
    </div>
  </div>
))

/**
 * Marketplace component
 *
 * @class Marketplace
 * @extends {React.Component<SectionProps>}
 */
class Marketplace extends React.Component<SectionProps> {
  public render() {
    return (
<<<<<<< HEAD
      <div>
        <header className={styles.header}>
          <div className={styles["header-text"]}>
            <h1>
              <span className={styles.title1}>Sheikah</span>
              <span className={styles.title2}>Marketplace</span>
            </h1>
            <p className={styles.subtitle}>
              Hundreds of data request and smart contact templates, ready to be
              deployed
            </p>
          </div>
        </header>
        <div className={styles.content}>
          <main className={styles.main}>
            <div className={styles.featured}>
              <h2 className={styles["section-title"]}>Featured</h2>
              <div className={styles.row}>
                {items}
              </div>
            </div>
            <div className={styles.insurance}>
              <h2 className={styles["section-title"]}>Insurance</h2>
              <div className={styles.row}>
                {items}
              </div>
            </div>
          </main>
          <nav className={styles.nav}>
            <ul className={styles["navbar-categories"]}>
              <li className={`${styles["navbar-item"]} ${styles["nav-border"]}`}>
                <a href="#">All categories</a>
              </li>
              <li className={`${styles["navbar-item"]} ${styles["nav-border"]}`}>
                <a href="#">Top Charts</a>
              </li>
              <li className={styles["navbar-item"]}>
                <a href="#">New releases</a>
              </li>
            </ul>
            <div className={`${styles.tags} ${styles.down}`}>
              <h4>Tags</h4>
              <hr className={styles.bar} />
              <ul className={styles["hashtag-list"]}>
                <li>
                  <a className={`${styles["hashtag-item"]}`} href="#">
                    #bet
                  </a>
                </li>
                <li>
                  <a className={`${styles["hashtag-item"]}`} href="#">
                    #multisig
                  </a>
                </li>
                <li>
                  <a className={`${styles["hashtag-item"]}`} href="#">
                    #oracle
                  </a>
                </li>
                <li>
                  <a className={`${styles["hashtag-item"]}`} href="#">
                    #parametric
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
=======
      // <div className={grid.layout}>
      //   <header className={styles.header}>
      //     <div className={styles["header-text"]}>
      //       <h1>
      //         <span className={styles.title1}>Sheikah</span>
      //         <span className={styles.title2}>Marketplace</span>
      //       </h1>
      //       <p className={styles.subtitle}>
      //         Hundreds of data request and smart contact templates, ready to be
      //         deployed
      //       </p>
      //     </div>
      //   </header>
      //   <main className={styles.main}>
      //     <div className={styles.featured}>
      //       <h2 className={styles["section-title"]}>Featured</h2>
      //       <div className={styles.row}>
      //         {items}
      //       </div>
      //     </div>
      //     <div className={styles.insurance}>
      //       <h2 className={styles["section-title"]}>Insurance</h2>
      //       <div className={styles.row}>
      //         {items}
      //       </div>
      //     </div>
      //   </main>
      //   <nav className={styles.nav}>
      //     <ul className={styles["navbar-categories"]}>
      //       <li className={`${styles["navbar-item"]} ${styles["nav-border"]}`}>
      //         <a href="#">All categories</a>
      //       </li>
      //       <li className={`${styles["navbar-item"]} ${styles["nav-border"]}`}>
      //         <a href="#">Top Charts</a>
      //       </li>
      //       <li className={styles["navbar-item"]}>
      //         <a href="#">New releases</a>
      //       </li>
      //     </ul>
      //     <div className={`${styles.tags} ${styles.down}`}>
      //       <h4>Tags</h4>
      //       <hr className={styles.bar} />
      //       <ul className={styles["hashtag-list"]}>
      //         <li>
      //           <a className={`${styles["hashtag-item"]}`} href="#">
      //             #bet
      //           </a>
      //         </li>
      //         <li>
      //           <a className={`${styles["hashtag-item"]}`} href="#">
      //             #multisig
      //           </a>
      //         </li>
      //         <li>
      //           <a className={`${styles["hashtag-item"]}`} href="#">
      //             #oracle
      //           </a>
      //         </li>
      //         <li>
      //           <a className={`${styles["hashtag-item"]}`} href="#">
      //             #parametric
      //           </a>
      //         </li>
      //       </ul>
      //     </div>
      //   </nav>
      // </div>
      <div>
        <RadonQuery></RadonQuery>
>>>>>>> wip initial component definition
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
  icon: "shopping-bag",
}

export default MarketplaceSection
