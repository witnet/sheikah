import * as React from "react";

import {
  SectionInfo,
  SectionProps
} from "app/renderer/ui/components/main/sections";

import * as urls from "app/renderer/constants/urls";
import { Link } from "react-router-dom";

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
            <h1>
              <span className={styles.title1}>Sheikah</span>
              <span className={styles.title2}>Marketplace</span>
            </h1>
            <p className={styles.subtitle}>
              Hundreds of data request and smart contact templates, 
              ready to be deployed
            </p>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles["featured"]}>
            <h2 className={styles["section-title"]}>Featured</h2>
            <div className={styles.row}>
              {this.state.featuredItems.map((e, i) => {
                return (
                  <div className={styles.item}>
                    <div className={styles["item-img"]} />
                    <div className={styles["item-text"]}>
                      <p>{e.name}</p>
                      <p>{e.author}</p>
                      <p>{e.rating}</p>
                      <p className={styles["hashtag-list"]}>
                        {e.hashtags.map(hashtag => {
                          return (
                            <a href="#" className={styles["hashtag-item"]}>
                              {hashtag}
                            </a>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles["insurance"]}>
            <h2 className={styles["section-title"]}>Insurance</h2>
            <div className={styles.row}>
              {this.state.insuranceItems.map((e, i) => {
                return (
                  <div key={i} className={styles.item}>
                    <div className={styles["item-img"]} />
                    <div className={styles["item-text"]}>
                      <p>{e.name}</p>
                      <p>{e.author}</p>
                      <br />
                      <p>{e.rating}</p>
                      <p className={styles["hashtag-list"]}>
                        {e.hashtags.map(hashtag => {
                          return (
                            <a href="#" className={styles["hashtag-item"]}>
                              {hashtag}
                            </a>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
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
          <div className={`${styles["tags"]} ${styles["down"]}`}>
            <h4>Tags</h4>
            <hr className={styles.bar} />
            <ul className={`${styles["hashtag-list"]}`}>
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
