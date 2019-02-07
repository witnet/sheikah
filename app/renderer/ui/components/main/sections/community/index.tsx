import * as React from "react"

import { SectionInfo, SectionProps } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import { shell } from "electron"

const emailLogo = require("svg/social/email.svg")
const githubLogo = require("svg/social/github.svg")
const gitterLogo = require("svg/social/gitter.svg")
const mediumLogo = require("svg/social/medium.svg")
const redditLogo = require("svg/social/reddit.svg")
const telegramLogo = require("svg/social/telegram.svg")
const twitterLogo = require("svg/social/twitter.svg")

const styles = require("./styles.scss")

/**
 * Method to open a link in the default external app (browser, mail client...)
 * @param url
 */
const openInExternalApp = (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  shell.openExternal(url)
}

/**
 * Community UI component
 *
 * @export
 * @class Community
 * @extends {React.Component<SectionProps>}
 */
export class Community extends React.Component<SectionProps> {
  public render() {
    return (
      <div className={styles.content}>
        <h2 className={styles.title}>Join the Witnet community!</h2>
        <ul className={styles.channels}>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={twitterLogo} />
            <a
              onClick={openInExternalApp("https://twitter.com/witnet_io")}
              target="_blank"
            >
              Witnet Foundation Twitter account
            </a>
            <p>
              Follow Witnet Foundation on Twitter to get daily updates on the progress of the
              project.
            </p>
          </li>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={mediumLogo} />
            <a
              onClick={openInExternalApp("https://medium.com/witnet")}
              target="_blank"
            >
              Witnet Foundation official blog on Medium
            </a>
            <p>
              Follow Witnet Foundation on Medium to read different articles stating our vision and
              future roadmap.
            </p>
          </li>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={telegramLogo} />
            <a
              onClick={openInExternalApp("https://t.me/witnetio")}
              target="_blank"
            >
              Witnet Community on Telegram
            </a>
            <p>Join other members of the Witnet Community at the official Telegram group.</p>
          </li>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={redditLogo} />
            <a
              onClick={openInExternalApp("https://reddit.com/r/witnet")}
              target="_blank"
            >
              Witnet Community subreddit
            </a>
            <p>The space for linking articles, informal discussion, kitten pictures and occasional
              memes.
            </p>
          </li>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={githubLogo} />
            <a
              onClick={openInExternalApp("https://github.com/witnet")}
              target="_blank"
            >
              Witnet GitHub repository
            </a>
            <p>
              GitHub is where the Witnet protocol development takes place. Are you a programmer?
              Your contributions are more than welcome!
            </p>
          </li>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={gitterLogo} />
            <a
              onClick={openInExternalApp("https://gitter.im/witnet/community")}
              target="_blank"
            >
              Witnet Development Community at Gitter
            </a>
            <p>
              Join the official Witnet community Gitter room to discuss with the rest of the
              community and get direct support from the developers.
            </p>
          </li>
          <li className={styles["list-item"]}>
            <img className={styles.back} src={emailLogo} />
            <a
              onClick={openInExternalApp("mailto:info@witnet.foundation?subject=Witnet project")}
              target="_blank"
            >
              Witnet Foundation contact email
            </a>
            <p>
              You can write us directly for any inquiry not appropriate for any of the other
              channels.
            </p>
          </li>
        </ul>
      </div>
    )
  }
}

const CommunitySection: SectionInfo = {
  key: "community",
  caption: "Community",
  sectionPath: urls.COMMUNITY_SECTION,
  path: urls.COMMUNITY_SECTION,
  component: Community,
  icon: "users",
}

export default CommunitySection
