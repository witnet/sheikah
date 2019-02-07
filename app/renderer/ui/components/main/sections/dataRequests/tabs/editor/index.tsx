import * as React from "react"

import CardDefault from "app/renderer/ui/components/card/default"
import { InputUnderlined } from "app/renderer/ui/components/input"
import {
  TabInfo,
  TabComponent,
} from "app/renderer/ui/components/main/sections"
import * as urls from "app/renderer/constants/urls"
import Wrapper from "app/renderer/ui/components/wrapper"
import { Services } from "app/renderer/services"

const svgBar = require("svg/dataRequestsEditorBar.svg")
const svgRetrieval = require("svg/dataRequestsEditorRetrieval.svg")
const svgAttestation = require("svg/dataRequestsEditorAttestation.svg")
const svgDelivery = require("svg/dataRequestsEditorDelivery.svg")

const styles = require("./style.scss")

/**
 * Props that contain configuration
 *
 * @interface Props
 */
interface Props {
  services: Services,
}
/**
 * Smart Contracts Editor tab component
 *
 * @class TabEditor
 * @extends {TabComponent<any>}
 */
class TabEditor extends TabComponent<any & Props> {
  public render() {
    const description =
      "Ask two different APIs for the weather in a certain location " +
      "at a future point in time, then send result to Ethereum contract."

    return (
      <div className={styles.wrapper}>
        {/* BAR */}
        <div className={`${styles.nav}`}>
          <img src={svgBar} />
        </div>
        {/* TRANSF INFORMATION */}
        <div className={`${styles.info}`}>
          <div className={`${styles["info-row"]}`}>
            <label className={styles.label}>FILE NAME</label>
            <InputUnderlined
              className={`${styles.input} ${styles["editor-form-row"]}`}
              type="text"
              value="ethereum-weather-reporter.rad"
              readOnly={true}
            />
            <label className={styles.label}>TITLE</label>
            <InputUnderlined
              className={`${styles.input} ${styles["editor-form-row"]}`}
              type="text"
              value="Report weather to Ethereum contract"
              readOnly={true}
            />
            <label className={styles.label}>DESCRIPTION</label>
            <textarea
              className={`${styles.textarea} ${styles.input} ${styles["editor-form-row"]}`}
              value={description}
              readOnly={true}
            />
          </div>
          <div className={`${styles["info-row"]}`}>
            <p className={styles.title}>PROTOCOL LEVEL PARAMETERS</p>
            <br />
            <CardDefault contentStyle={styles.cardContent}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.param}>
                      <p>datetime</p>
                    </td>
                    <td>
                      <p>exec_time</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.param}>
                      <p>int</p>
                    </td>
                    <td>
                      <p>replication_factor</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardDefault>
            <br />
            <p className={styles.title}>TEMPLATE SPECIFIC PARAMETERS</p>
            <br />
            <CardDefault contentStyle={styles.cardContent}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.param}>
                      <p>string</p>
                    </td>
                    <td>
                      <p>location</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.param}>
                      <p>string</p>
                    </td>
                    <td>
                      <p>eth_address</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardDefault>
          </div>
        </div>
        {/* EDITORS */}
        <div className={`${styles.editors}`}>
          <Wrapper title="RETRIEVAL LOGIC" className={styles.editor}>
            <img src={svgRetrieval} />
          </Wrapper>
          <Wrapper title="ATTESTATION LOGIC" className={styles.editor}>
            <img src={svgAttestation} />
          </Wrapper>
          <Wrapper title="DELIVERY LOGIC" className={styles.editor}>
            <img src={svgDelivery} />
          </Wrapper>
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
  path: urls.DATA_REQUESTS_EDITOR_TAB,
  component: TabEditor,
}

export default EditorTab
