import * as React from "react";

import {
  SectionInfo,
  SectionProps
} from "app/renderer/ui/components/main/sections";

import * as urls from "app/renderer/constants/urls";

const grid = require("app/renderer/ui/components/main/style.scss");
const styles = require("./style.scss");
const svgImage = require("svg/wallet.svg");

/**
 * Marketplace component
 *
 * @class Marketplace
 * @extends {React.Component<SectionProps>}
 */
class Marketplace extends React.Component<SectionProps> {
  public state = {
    featuredItems: [
      {
        name: "n-of-m Multisig",
        img: "cosa",
        author: "by @aesedepece",
        rating: "*****",
        hashtags: ["#multisig", "#parametric"]
      },
      {
        name: "Pay to Alice or Bob, based on API response",
        img: "cosa",
        author: "by @aesedepece",
        rating: "*****",
        hashtags: ["#bet", "#oracle", "#parametric"]
      },
      {
        name: "Crypto-heirship",
        img: "cosa",
        author: "by @aesedepece",
        rating: "*****",
        hashtags: ["#oracle", "#parametric"]
      }
    ],
    insuranceItems: [
      {
        name: "Pay if flight is delayed",
        img: "cosa",
        author: "by @aesedepece",
        rating: "*****",
        hashtags: ["#oracle", "#parametric"]
      },
      {
        name: "Pay if it rains",
        img: "cosa",
        author: "by @aesedepece",
        rating: "*****",
        hashtags: ["#oracle", "#parametric", "#weather"]
      }
    ]
  };

  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={grid["layout"]}>
        <header className={styles.header}>
          <div className={styles["header-text"]}>
            <h1>Sheikah Marketplace</h1>
            <p>
              Hundreds of data request and smart contact templates, ready to be
              deployed
            </p>
          </div>
        </header>
        <main className={styles.main}>
            <h2>Featured</h2>
          <div className={styles["row"]}>
            {this.state.featuredItems.map((e, i) => {
              return (
                <div className={styles["item"]}>
                  <p>{e.name}</p>
                  <p>{e.author}</p>
                  <p>{e.rating}</p>
                  <p>{e.hashtags.map(hashtag => hashtag)}</p>
                </div>
              );
            })}
          </div>
          <div>
            <h2>Insurance</h2>
            {this.state.insuranceItems.map((e, i) => {
              return (
                <div key={i}>
                  <p>{e.name}</p>
                  <p>{e.author}</p>
                  <p>{e.rating}</p>
                  <p>{e.hashtags.map(hashtag => hashtag)}</p>
                </div>
              );
            })}
          </div>
        </main>
        <nav className={styles.nav}>
          <div className={styles["navbar-categories"]}>
            <ul>
              <li className={styles["navbar-item"]}>All categories</li>
              <li className={styles["navbar-item"]}>Top Charts</li>
              <li className={styles["navbar-item"]}>New releases</li>
            </ul>
          </div>
          <div className={styles["tag-categories"]}>
            <h4>Tags</h4>
            <ul className={styles["tags"]}>
              <li>#bet</li>
              <li>#multisig</li>
              <li>#oracle</li>
              <li>#parametric</li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const MarketplaceSection: SectionInfo = {
  key: "marketplace",
  caption: "Marketplace",
  sectionPath: urls.MARKETPLACE_SECTION,
  path: urls.MARKETPLACE_SECTION,
  component: Marketplace,
  icon: "shopping-bag"
};

export default MarketplaceSection;
