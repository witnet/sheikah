import * as React from "react"

import CardDefault from "app/renderer/ui/components/card/default"
import { InputUnderlined } from "app/renderer/ui/components/input"
import { TabInfo, TabComponent } from "app/renderer/ui/components/main/sections"
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
        <img className={styles.bar} src={svgBar} />
        <div className={styles.left}>
          <Wrapper
            className={styles.logic}
            empty={true}
            title="RETRIEVAL LOGIC"
          >
            <img src={svgRetrieval} />
          </Wrapper>
          <Wrapper
            className={styles.logic}
            empty={true}
            title="ATTESTATION LOGIC"
          >
            <img src={svgAttestation} />
          </Wrapper>
          <Wrapper
            className={styles.logic}
            empty={true}
            title="DELIVERY LOGIC"
          >
            <img src={svgDelivery} />
          </Wrapper>
        </div>
        <div className={styles.right}>
          <label className={styles.label}>FILE NAME</label>
          <InputUnderlined
            className={styles.input}
            type="text"
            value="ethereum-weather-reporter.rad"
          />

          <label className={styles.label}>TITLE</label>
          <InputUnderlined
            className={styles.input}
            type="text"
            value="Report weather to Ethereum contract"
          />

          <label className={styles.label}>DESCRIPTION</label>
          <textarea className={`${styles.textarea} ${styles.input}`}>
            Ask two different APIs for the weather in a certain location at a future
            point in time, then send result to Ethereum contract.
          </textarea>

          <p className={styles.title}>PROTOCOL LEVEL PARAMETERS</p>
          <CardDefault contentStyle={styles.cardContent}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.param}><p>datetime</p></td>
                  <td><p>exec_time</p></td>
                </tr>
                <tr>
                  <td className={styles.param}><p>int</p></td>
                  <td><p>replication_factor</p></td>
                </tr>
              </tbody>
            </table>
          </CardDefault>

          <p className={styles.title}>TEMPLATE SPECIFIC PARAMETERS</p>
          <CardDefault contentStyle={styles.cardContent}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.param}><p>string</p></td>
                  <td><p>location</p></td>
                </tr>
                <tr>
                  <td className={styles.param}><p>string</p></td>
                  <td><p>eth_address</p></td>
                </tr>
              </tbody>
            </table>
          </CardDefault>
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
  component: TabEditor
}

export default EditorTab
