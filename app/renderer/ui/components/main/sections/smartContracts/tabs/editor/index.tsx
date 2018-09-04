import CardDefault from "app/renderer/ui/components/card/default"
import * as React from "react"

import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import Wrapper from "app/renderer/ui/components/wrapper"
import { Services } from "app/renderer/services"

const svgBar = require("svg/smartContractsEditorBar.svg")
const svgComposer = require("svg/smartContractsEditorComposer.svg")
const svgSideContent = require("svg/smartContractsEditorSideContent.svg")

const layoutStyles = require("app/renderer/ui/components/main/sections/smartContracts/style.scss")
const styles = require("./style.scss")
const tabStyles = require("app/renderer/ui/components/main/sections/smartContracts/tabs/style.scss")

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
      <div className={layoutStyles.layout}>
        <div className={`${styles.bar}`}>
          <img src={svgBar} />
        </div>
        <div className={`${tabStyles.left} ${styles.left}`}>
          <Wrapper
            title="CONTRACT LOGIC"
          >
            <CardDefault
              className={styles.editor}
            >
              <img src={svgComposer} />
            </CardDefault>
          </Wrapper>
        </div>
        <div className={`${tabStyles.right} ${styles.right}`}>
          <img src={svgSideContent} />
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