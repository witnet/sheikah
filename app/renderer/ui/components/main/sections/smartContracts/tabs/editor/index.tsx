import CardDefault from "app/renderer/ui/components/card/default"
import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import Wrapper from "app/renderer/ui/components/wrapper"
import { Services } from "app/renderer/services"

const svgComposer = require("svg/smartContractsEditorComposer.svg")
const svgSideContent = require("svg/smartContractsEditorSideContent.svg")

const styles = require("./style.scss")

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  services: Services
}
/**
 * Smart Contracts Editor tab component
 *
 * @class TabEditor
 * @extends {TabComponent<any>}
 */
class TabEditor extends TabComponent<any & Props> {
  // tslint:disable-next-line:prefer-function-over-method completed-docs
  public render() {
    return (
      <div className={styles.layout}>
        <div className={styles.bar}>
          <p className={styles.first}>
            <span>Editing </span>
            <span className={styles.semibold}>'Pay to Alice or Bob, based on API response'</span>
          </p>
          <p className={styles.triangle} />
          <p className={styles.second}>New</p>
          <p className={styles.third}>Open</p>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Wrapper
              className={styles.contract}
              title="CONTRACT LOGIC"
            >
              <CardDefault
                className={styles.editor}
              >
                <img src={svgComposer} />
              </CardDefault>
            </Wrapper>
          </div>
          <img className={styles.right} src={svgSideContent} />
        </div>
      </div>
    )
  }
}

/**
 * Tab information
 */
const EditorTab: TabInfo = {
  key: "editor",
  caption: "Editor",
  path: urls.SMART_CONTRACTS_EDITOR_TAB,
  component: TabEditor
}

export default EditorTab